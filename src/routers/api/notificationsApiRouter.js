import { Router } from 'express';
import path from 'path';
import { __dirname } from '../../utilities.js';
import MailService from '../../services/mailService.js';
import TwilioService from '../../services/twilioService.js';

const router = Router();

router.get('/send-email', async (req, res, next) => {
  try {
    const result = await MailService.sendEmail(
      'majimart.dev@gmail.com',
      'Prueba de envío',
      `
      <div>
        <h1>Hola!</h1>
        <p>Probando envío de email desde Node</p>
        <img src:"cid:pink-github-001"/>
      </div>
      `,
      [
        {
          filename: 'pink-github-logo.png',
          path: path.join(__dirname, './img/Github.png'),
          cid: 'pink-github-001'
        }
      ]
    );
    req.logger.info('Successful email sending');
    res.status(200).send({ message: 'Successful email sending' });
  } catch (error) {
    next(res.status(error.statusCode || 500).json({ message: error.message }));
  }
});

router.get('/send-sms', async (req, res, next) => {
  try {
    const result = await TwilioService.sendSMS('+34652183617', 'Prueba envio SMS');
    req.logger.info('Successful sms sending');
    res.status(200).send({ message: 'Successful sms sending' });
  } catch (error) {
    next(res.status(error.statusCode || 500).json({ message: error.message }));
  }
});

export default router;