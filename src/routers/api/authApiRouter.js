import { Router } from 'express';
import UserModel from '../../models/userModel.js';
import UserController from '../../controllers/userContoller.js';
import { createHash, isValidPassword, tokenGenerator } from '../../utilities.js';

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
  
    if (!email || !password) {
      req.logger.error('Wrong email or password');
      return res.status(401).send({ message: 'Wrong email or password' });
    }
  
    const user = await UserModel.findOne({ email });
  
    if (!user) {
      req.logger.warning('Unregistered user');
      return res.status(401).send({ message: 'Unregistered user' });
    }
  
    const validPass = isValidPassword(password, user);
  
    if (!validPass) {
      req.logger.error('Wrong email or password');
      return res.status(401).send({ message: 'Wrong email or password' });
    }
  
    user.last_connection = new Date();
    await user.save();
    
    const token = tokenGenerator(user);
  
    req.logger.info('Successfully login');
    res
      .cookie('access_token', token, {
        maxAge: 600000,
        httpOnly: true
      })
      .status(200)
      .redirect('/products');
  } catch (error) {
    next(
      res.status(error.statusCode || 500).json({ message: error.message })
    );
  }
  
});

export default router;
