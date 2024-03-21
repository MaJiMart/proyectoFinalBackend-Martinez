import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import { NotFound, Exception, BadRequest, createHash, isValidPassword } from '../utilities.js';
import UserModel from '../models/userModel.js';
import UserController from './userContoller.js';
import MailService from '../services/mailService.js';

const JWT_SECRET = config.jwtSecret;

export default class RecPassController {
  static async recPass({ email }) {
    try {
      const user = await UserModel.findOne({ email });

      if (!user) {
        throw new NotFound('User not found', 404);
      }

      const recPassToken = jwt.sign({ user: user._id }, JWT_SECRET, {
        expiresIn: '1h',
      });

      user.resetPasswordToken = recPassToken;
      await user.save();

      try {
        await MailService.sendEmail(
          user.email,
          'Password recovery',
          `
        <div>
          <h1>Hi ${user.first_name}</h1>
          <p>With all the passwords we currently have, it is normal that we forget some, don't worry, to recover it click on the following link:</p>
          <a href="https://proyectofinalbackend-martinez-production.up.railway.app/new-password?token=${recPassToken}">Recover Password</a>
          <h3>IMPORTANT!</h3>
          <p>The link expires in one hour</p>
        </div>
        `
        );
      } catch (error) {
        throw new BadRequest('Unregistered user', 401);
      }
    } catch (error) {
      throw new Exception(`Login error: ${error.message}`, 500);
    }
  }

  static async newPass({ newPass, repNewPass, token }) {
    const decodedToken = jwt.verify(token, JWT_SECRET)
    const uid = decodedToken.user
    const user = await UserController.getById(uid)
    
    if (!decodedToken) {
      throw new BadRequest('Invalid or expired reset token');
    }

    if (!user) {
      throw new NotFound('User not found or invalid token');
    }
    
    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (decodedToken.exp < currentTimestamp) {
      return res.redirect('/recoverPass');
    }
   
    const verifyPass = isValidPassword(newPass, user)

    if (verifyPass === true){
      throw new BadRequest('The new password cant be the same as the previous one');
    }

    if (newPass !== repNewPass) {
      throw new BadRequest('Passwords dont match!');
    }

    user.password = createHash(newPass);
    user.resetPasswordToken = undefined;
    await user.save();
  }
}
