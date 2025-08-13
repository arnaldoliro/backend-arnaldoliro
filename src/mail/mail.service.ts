import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // SMTP do seu provedor
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER, // seu email
        pass: process.env.MAIL_PASS, // senha ou app password
      },
    });
  }

  async sendContactMessage(userName: string, userEmail: string, message: string) {
    // 📤 Envia a mensagem para você
    await this.transporter.sendMail({
      from: `"Formulário Site" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_RECEIVER, // Seu email
      subject: '📩 Nova mensagem do formulário',
      text: `De: ${userName} (${userEmail})\n\n${message}`,
    });

    // 📤 Resposta automática para o usuário
    await this.transporter.sendMail({
      from: `"Minha Empresa" <${process.env.MAIL_USER}>`,
      to: userEmail,
      subject: 'Recebemos sua mensagem!',
      text: `Olá ${userName}, recebemos sua mensagem e entraremos em contato em breve.`,
    });
  }
}