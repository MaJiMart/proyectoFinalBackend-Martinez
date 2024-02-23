import UserDTO from '../dto/userDto.js';


export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getUsers(criteria = {}) {
    const users = await this.dao.getUsers(criteria);
    return users;
  }

  async getShowUsers(criteria = {}) {
    const users = await this.dao.getUsers(criteria);
    return users.map(user => new UserDTO(user));
  }

  async getUser(uid) {
    return await this.dao.getUser(uid)
  }

  async createUser(data) {
    return await this.dao.createUser(data);
  }

  async updateUser(uid, data) {
    return await this.dao.updateUser(uid, data);
  }

  async deleteInactiveUsers() {
    return 
  }

  async deleteUser(uid) {
    return await this.dao.deleteUser(uid);
  }
}