// email/mailer.service.ts

import { Injectable } from '@nestjs/common';
import * as mailgun from 'mailgun-js';

@Injectable()
export class MailerService {
  private mailgun;

  constructor() {
    this.mailgun = mailgun({
      apiKey: '0bb0bcbeae204db5daf1e127e4bc3d00-2c441066-14104836', // Replace with your Mailgun API key
      domain: 'test.coder099.com', // Replace with your Mailgun domain
    });
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const data = {
      from: 'test123@gmail.com', // Replace with your name
      to,
      subject,
      text,
    };

    await this.mailgun.messages().send(data);
  }
}
