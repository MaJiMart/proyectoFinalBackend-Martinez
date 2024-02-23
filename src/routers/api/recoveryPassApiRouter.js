import { Router } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../../models/userModel.js';
import config from '../../config/config.js';
import { NotFound, BadRequest, createHash, isValidPassword } from '../../utilities.js';
import MailService from '../../services/mailService.js';
import UserController from '../../controllers/userContoller.js';

const router = Router();
const JWT_SECRET = config.jwtSecret;

router.post('/recover-password', async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new NotFound('User not found');
    }

    const recPassToken = jwt.sign({ user: user._id }, JWT_SECRET, { expiresIn: '1h' });

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
          <a href="http://localhost:8080/newPass.html?token=${recPassToken}">Recover Password</a>
          <h3>IMPORTANT!</h3>
          <p>The link expires in one hour</p>
        </div>
        `
      );
      req.logger.info('Successful email sending');
      res.status(200).send({ message: 'Successful email sending' });
    } catch (error) {
      next(
        res.status(error.statusCode || 500).json({ message: error.message })
      );
    }
  } catch (error) {
    next(res.status(error.statusCode || 500).json({ message: error.message }));
  }
});

router.post('/new-password', async (req, res, next) => {
  try {
    const {
      body: { newPass, repNewPass, token },
    } = req;

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
      return res.redirect('http://localhost:8080/recoverPass.html');
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

    res.status(200).json({ message: 'Password reset successful' });

  } catch (error) {
    next(res.status(error.statusCode || 500).json({ message: error.message }));
  }
});

/* router.get('/recover-password/:token', async (req, res, next) => {
  try {
    const {
      body: { newPass },
      params: { token },
    } = req;

    const decodedToken = jwt.verify(token, JWT_SECRET)
    const uid = decodedToken.user
    const user = await UserController.getById(uid)

    if (!user) {
      throw new BadRequest('Invalid or expired reset token');
    }

    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (decodedToken.exp < currentTimestamp) {
      return res.redirect('http://localhost:8080/recoverPass.html');
    }
   
    const verifyPass = isValidPassword(newPass, user)

    if (verifyPass === true){
      throw new BadRequest('The new password cant be the same as the previous one');
    }

    user.password = createHash(newPass);
    user.resetPasswordToken = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });

  } catch (error) {
    next(res.status(error.statusCode || 500).json({ message: error.message }));
  }
}); */

export default router;
