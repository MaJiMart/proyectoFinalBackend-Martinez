import { Router } from 'express';

const router = Router();

router.get('/loggerTest', async (req, res, next) => {
  try {
    req.logger.debug('this is a debug log test');
    req.logger.http('this is a http log test');
    req.logger.info('this is a info log test');
    req.logger.warning('this is a warning log test');
    req.logger.error('this is a error log test');
    req.logger.fatal('this is a fatal log test');

    res.status(200).send('Test run');
  } catch (error) {
    next(error);
  }
});

export default router;
