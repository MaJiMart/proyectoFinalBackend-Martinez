import { userRepository } from '../repositories/index.js';

export default class UserService {
  static getUsers(filter = {}) {
    return userRepository.getUsers(filter);
  }

  static getShowUsers(filter = {}) {
    return userRepository.getShowUsers(filter)
  }

  static getUser(uid) {
    return userRepository.getUser(uid)
  }

  static async createUser(payload) {
    const user = await userRepository.createUser(payload);
    return user;
  }

  static updateUser(uid, payload) {
    return userRepository.updateUser(uid, payload);
  }

  static deleteUser(uid) {
    return userRepository.deleteUser(uid);
  }
}