import nodemailer from 'nodemailer';
import User from '../models/User';

class PasswordController {
  async generateCode(req, res) {
    try {
      const user = await User.findOne({ where: { email: req.body.email } });
      if (!user) {
        return res.status(400).json({
          errors: ['Invalid credencial'],
        });
      }
      const validationCode = Math.random().toString(36).slice(0, 10);
      await User.update({ validation_code: validationCode }, {

        where: {
          email: req.body.email,
        },
      });

      const transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.MAILER_USER,
          pass: process.env.MAILER_PASSWORD,
        },
      });

      const response = await transport.sendMail({
        from: 'Icaro Rabelo <icarosrabelo@gmail.com>',
        to: req.body.email,
        subject: 'New password',
        html: `<div style="color:black"><b>Please, use the code below to reset your password.</b></div>
        <p style="color:black"><b>Your validation code is: ${validationCode}</b></p>`,
      });
      console.log('E-mail has been sent', response);

      return res.json(validationCode);
    } catch (e) {
      return res.sendStatus(500);
    }
  }

  async validateCode(req, res) {
    try {
      const user = await User.findOne({
        where: {
          validation_code: req.body.code,
          email: req.body.email,
        },
      });

      if (!user) {
        return res.status(400).json({
          errors: ['Invalid e-mail/or code'],
        });
      }
      await user.update({ password: req.body.password });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: ['Invalid credencial'],
      });
    }
    return res.sendStatus(204);
  }
}

export default new PasswordController();
