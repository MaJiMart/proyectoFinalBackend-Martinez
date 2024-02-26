import UserService from '../services/userService.js';
import UserModel from '../models/userModel.js';
import CartController from './cartController.js';
import { NotFound, Exception, BadRequest } from '../utilities.js';
import { logger } from '../config/logger.js';
import MailService from '../services/mailService.js';

export default class UserController {
  static async getUsers(query = {}) {
    return await UserService.getUsers(query);
  }

  static async getShowUsers(query = {}) {
    try {
      return await UserService.getShowUsers(query);
    } catch (error) {
      throw new NotFound(`Users not found: ${error.message}`, 400);
    }
  }

  static async createUser({ first_name, last_name, email, age, password, role }) {
    try {
      if (!first_name || !last_name || !email || !password) {
        logger.error('All fields are required to successfully register the user');
        throw new BadRequest('All fields are required', 400);
      }
      let user = await UserModel.findOne({ email });
      if (user) {
        logger.warning('User already registered');
        throw new BadRequest('User already registered', 400);
      }
      const cart = await CartController.createCart();
      return await UserService.createUser({
        first_name,
        last_name,
        email,
        password,
        age,
        role
      });
    } catch (error) {
      throw new Exception(`Error creating user: ${error.message}`, 500);
    }
  }

  static async getById(uid) {
    const user = await UserService.getUser(uid);
    if (!user) {
      throw new NotFound(`The user with id ${uid}was not found`);
    }
    return user;
  }

  static async updateUser(uid, data) {
    try {
      await UserController.getById(uid);
      await UserService.updateUser(uid, data);
    } catch (error) {
      throw new Exception(`Error updating user: ${error.message}`, 500);
    }
  }

  static async changeRole(uid) {
    try {
      const user = await UserController.getById(uid);

      if (user.role === 'user') {
        const requiredDocuments = ['ID', 'addressProof', 'accountStatus'];

        const userDocumentsSet = new Set(user.documents.map((doc) => doc.name));

        if (!requiredDocuments.every((doc) => userDocumentsSet.has(doc))) {
          logger.error('All documents are required to successfully role change');
          throw new BadRequest('Missing required documents for premium upgrade', 400);
        }
        await UserController.updateUser(uid, { role: 'premium' });
      } else {
        await UserController.updateUser(uid, { role: 'user' });
      }
      await user.save();
    } catch (error) {
      throw new Exception(`Error updating role user: ${error.message}`, 500);
    }
  }

  static async deleteInactiveUsers() {
    try {
      const users = await UserController.getUsers();
      // cutoffDate -> el número 2 de la resta representa la cantidad de días solicitada desde la última conexión
      const cutoffDate = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
      const inactiveUsers = users.filter(
        (user) => user.last_connection < cutoffDate
      );

      if (!inactiveUsers.length) {
        logger.info('There are no inactive users');
        throw new NotFound('There are no inactive users', 400);
      }
      inactiveUsers.forEach((user) => {
        MailService.sendEmail(
          user.email,
          'Deleted account',
          `
              <div>
                <h1>Hi ${user.first_name}</h1>
                <p>We have detected that you have not accessed our store for a while, so we have decided to delete your profile.</p>
                <p>Hope you come back soon, we would love for you to join us again.</p>
                <br>Greetings,</br>
              </div>
              `
        );
        UserController.deleteUser(user._id);
      });
    } catch (error) {
      throw new Exception(`Error deleting users: ${error.message}`, 500);
    }
  }

  static async deleteUser(uid) {
    try {
      await UserController.getById(uid);
      await UserService.deleteUser(uid);
    } catch (error) {
      throw new Exception(`Error deleting user: ${error.message}`, 500);
    }
  }
}
