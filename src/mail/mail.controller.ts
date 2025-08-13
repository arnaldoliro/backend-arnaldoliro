import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('contact')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  async sendMessage(@Body() body: { name: string; email: string; message: string }) {
    const { name, email, message } = body;
    await this.mailService.sendContactMessage(name, email, message);
    return { success: true, message: 'Mensagem enviada com sucesso!' };
  }
}