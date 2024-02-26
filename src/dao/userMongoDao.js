import UserModel from '../models/userModel.js';
import CartsDao from './cartMongoDao.js';


export default class UserDao {
  getUsers(criteria = {}) {
    return UserModel.find(criteria)
  }

  getUser(uid) {
    return UserModel.findById(uid)
  }

  async createUser(data) {
    const user = UserModel.create(data);
    const cartDao = new CartsDao();
    await cartDao.createCart({ user: user._id });

    return user;
  }

  updateUser(uid, data) {
    return UserModel.updateOne({ _id: uid }, { $set: data });
  }

  deleteUser(uid) {
    return UserModel.deleteOne({ _id: uid });
  }
}