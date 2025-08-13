import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendContactMessage(userName: string, userEmail: string, message: string) {
    await this.transporter.sendMail({
      from: `"Formulário Site" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_RECEIVER,
      subject: '📩 Nova mensagem do formulário',
      text: `De: ${userName} (${userEmail})\n\n${message}`,
    });

    await this.transporter.sendMail({
      from: `"Minha Empresa" <${process.env.MAIL_USER}>`,
      to: userEmail,
      subject: 'Recebemos sua mensagem!',
      text: `Olá ${userName}, recebemos sua mensagem e entraremos em contato em breve.`,
    });

  }
}