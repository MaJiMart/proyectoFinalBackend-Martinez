import { Router } from 'express';
import { authenticationMidd, authorizationMidd } from '../../middlewares/authMiddlewares.js';

const router = Router();

router.get('/current', authenticationMidd('jwt'), (req, res) => {
  res.status(200).json(req.user)
})

router.get('/admin', authenticationMidd('jwt'), authorizationMidd('admin'), (req, res) => {
  res.status(200).json({ success: true})
})

export default router;
