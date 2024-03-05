import { Router } from 'express';
import { authenticationMidd, authorizationMidd } from '../../middlewares/authMiddlewares.js';
import UserController from '../../controllers/userContoller.js';

const router = Router();

router.get('/users', authenticationMidd('jwt'), async (req, res, next) => {
    try {
      const users = await UserController.getUsers(req.query);
      const userData = req.user;
     
      res.render('adminUsers', buildResponse(users, { userData }))
    } catch (error) {
      next(
        res.status(error.statusCode || 500).json({ message: error.message })
      );
    }
  }
);

const buildResponse = (data, { userData }) => {
  const payload = data.map(user => user.toJSON())
    return {
        payload,
        isAdmin: userData.role === 'admin',
        userData: userData
    }
};

router.put('/users/premium/:uid', authenticationMidd('jwt'), authorizationMidd(['user', 'premium']), async (req, res, next) => {
  try {
    const {
      params: { uid },
    } = req;

    await UserController.changeRole(uid);
    return res.status(200).json({ message: 'Now your have a new role' });
  } catch (error) {
    next(
      res.status(error.statusCode || 500).json({ message: error.message })
    );
  }
}
);

export default router;