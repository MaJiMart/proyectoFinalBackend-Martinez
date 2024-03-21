import UserModel from '../models/userModel.js';
import { Exception, BadRequest, isValidPassword } from '../utilities.js';
import { logger } from '../config/logger.js';

export default class AuthController {
  static async login({ email, password }) {
    try {
      if (!email || !password) {
        logger.error('Wrong email or password');
        throw new BadRequest('Wrong email or password', 401);
      }

      const user = await UserModel.findOne({ email });

      if (!user) {
        logger.warning('Unregistered user');
        throw new BadRequest('Unregistered user', 401);
      }

      const validPass = isValidPassword(password, user);

      if (!validPass) {
        logger.error('Wrong email or password');
        throw new BadRequest('Wrong email or password', 401);
      }

      user.last_connection = new Date();
      await user.save();

    } catch (error) {
      throw new Exception(`Login error: ${error.message}`, 500);
    }
  }
}
