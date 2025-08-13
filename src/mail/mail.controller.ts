import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('contact')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  async sendMessage(@Body() body: { name: string; email: string; message: string }) {
    await this.mailService.sendContactMessage(body.name, body.email, body.message);
    return { success: true, message: 'Mensagem enviada com sucesso!' };
  }
}
