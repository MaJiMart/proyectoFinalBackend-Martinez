import { Router } from 'express';
import UserModel from '../../models/userModel.js';
import CartsDao from '../../dao/cartMongoDao.js';
import { createHash, isValidPassword, tokenGenerator } from '../../utilities.js';

const router = Router();

router.post('/auth/register', async (req, res) => {
  const {
    body: { first_name, last_name, email, age, password, role },
  } = req;
  if (!first_name || !last_name || !email || !password) {
    req.logger.error('All fields are required to successfully register the user')
    return res.status(400).send({ message: 'All fields are required' });
  }
  let user = await UserModel.findOne({ email });
  if (user) {
    req.logger.warning('Already registered user');
    return res.status(400).send({ message: 'Already registered user' });
  }
  user = await UserModel.create({
    first_name,
    last_name,
    email,
    age,
    password: createHash(password),
    role,
  });
  const cartDao = new CartsDao();
  await cartDao.createCart({ user: user._id });
  req.logger.info('Successfully registered user');
  res.status(201).send({ message: 'Successfully registered user' });
});

router.post('/auth/login', async (req, res) => {
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

  res
    .cookie('access_token', token, {
      maxAge: 600000,
      httpOnly: true
    })
    .status(200)
    .json({ status: 'success' });
});

export default router;
