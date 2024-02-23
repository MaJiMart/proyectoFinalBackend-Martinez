import UserService from '../services/userService.js';
import { NotFound, Exception } from '../utilities.js';


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
