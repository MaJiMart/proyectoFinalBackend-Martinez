import UserModel from '../models/userModel.js';

export default class UserDao {
  getUsers(criteria = {}) {
    return UserModel.find(criteria)
  }

  getUser(uid) {
    return UserModel.findById(uid)
  }

  async createUser(data) {
    const user = UserModel.create(data);
    return user;
  }

  updateUser(uid, data) {
    return UserModel.updateOne({ _id: uid }, { $set: data });
  }

  deleteUser(uid) {
    return UserModel.deleteOne({ _id: uid });
  }
}