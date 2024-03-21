import { Router } from 'express';
import RecPassController from '../../controllers/recoveryPassController.js';

const router = Router();

router.post('/recover-password', async (req, res, next) => {
  try {
    const { email } = req.body;
      await RecPassController.recPass({ email })

      req.logger.info('Successful email sending');
      res.status(200).redirect('/');

  } catch (error) {
    next(res.status(error.statusCode || 500).json({ message: error.message }));
  }
});

router.post('/new-password', async (req, res, next) => {
  try {
    const {
      body: { newPass, repNewPass, token },
    } = req;

    await RecPassController.newPass({ newPass, repNewPass, token })

    req.logger.info('Password reset successfuly');
    res.status(200).redirect('/');

  } catch (error) {
    next(res.status(error.statusCode || 500).json({ message: error.message }));
  }
});

export default router;
