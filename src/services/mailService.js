import nodemailer from 'nodemailer';
import config from '../config/config.js';

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: config.mail.service,
      port: config.mail.port,
      auth: {
        user: config.mail.userEmail,
        pass: config.mail.userPass,
      },
    })
  }

  sendEmail(to, subject, html, attachments = []) {
    return this.transporter.sendMail({
      from: config.mail.userEmail,
      to,
      subject,
      html,
      attachments,
    });
  }
}

export default new MailService();