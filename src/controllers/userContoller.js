import UserService from '../services/userService.js';
import { NotFound, Exception } from '../utilities.js';
import MailService from '../services/mailService.js';


export default class UserController {
  static async getUsers(query = {}) {
    return await UserService.getUsers(query);
  }

  static async getShowUsers(query = {}) {
    try {
      return await UserService.getShowUsers(query);
    } catch (error) {
      throw new NotFound(`Users not found: ${error.message}`, 400)
    }
  }

  static async createUser(data) {
    try {
      return await UserService.createUser(data);
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

  static async deleteInactiveUsers() {
    try {
      const users = await UserController.getUsers()
      // cutoffDate -> el número 2 de la resta es la cantidad de días solicitada desde la última conexión
      const cutoffDate = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
      const inactiveUsers = users.filter(user => user.last_connection < cutoffDate)
      inactiveUsers.forEach(user => {
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
        UserController.deleteUser(user._id)
        //console.log(`borrar usuario con id: ${user._id}`);
        
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
