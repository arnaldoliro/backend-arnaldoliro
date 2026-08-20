import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendContactMessage(
    userName: string,
    userEmail: string,
    message: string,
  ) {
    const from = process.env.MAIL_FROM as string;
    const receiver = process.env.MAIL_RECEIVER as string;

    const notification = await this.resend.emails.send({
      from,
      to: receiver,
      replyTo: userEmail,
      subject: '📩 Nova mensagem do formulário',
      text: `De: ${userName} (${userEmail})\n\n${message}`,
    });

    if (notification.error) {
      throw new InternalServerErrorException(
        'Falha ao enviar notificação de contato',
      );
    }

    const autoReply = await this.resend.emails.send({
      from,
      to: userEmail,
      replyTo: receiver,
      subject: 'Recebemos sua mensagem!',
      text: `Olá ${userName}, recebemos sua mensagem e entraremos em contato em breve.`,
    });

    if (autoReply.error) {
      throw new InternalServerErrorException(
        'Falha ao enviar confirmação de recebimento',
      );
    }
  }
}
