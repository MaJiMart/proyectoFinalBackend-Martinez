import { Router } from 'express';
import UserModel from '../../models/userModel.js';
import UserController from '../../controllers/userContoller.js';
import AuthController from '../../controllers/authController.js';
import { createHash, tokenGenerator } from '../../utilities.js';

const router = Router();

router.post('/auth/register', async (req, res, next) => {
  try {
    const {
      body: { first_name, last_name, email, age, password, role, cart },
    } = req;

    await UserController.createUser({
      ...req.body,
      password: createHash(password),
    });

    req.logger.info('Successfully registered user');
    res.status(201).redirect('/');
  } catch (error) {
    next(
      res.status(error.statusCode || 500).json({ message: error.message })
    );
  }
});

router.post('/auth/login', async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;

    await AuthController.login({email, password});

    const user = await UserModel.findOne({ email });

    let redirectPath = '/products';

    if (user.role === 'admin') {
      redirectPath = '/users';
    }
        
    const token = tokenGenerator(user);
  
    req.logger.info('Successfully login');
    res
      .cookie('access_token', token, {
        maxAge: 600000,
        httpOnly: true
      })
      .status(200)
      .redirect(redirectPath);
  } catch (error) {
    next(
      res.status(error.statusCode || 500).json({ message: error.message })
    );
  }
});

router.post('/auth/logout', async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    req.logger.info('Successfully logout');
    res.redirect('/');
  } catch (error) {
    next(
      res.status(error.statusCode || 500).json({ message: error.message })
    );
  }
});

export default router;
