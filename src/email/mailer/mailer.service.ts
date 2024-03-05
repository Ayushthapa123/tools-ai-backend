// email/mailer.service.ts

import { Injectable } from '@nestjs/common';
import * as mailgun from 'mailgun-js';

@Injectable()
export class MailerService {
  private mailgun;

  constructor() {
    this.mailgun = mailgun({
      apiKey: 'your-mailgun-api-key', // Replace with your Mailgun API key
      domain: 'your-mailgun-domain', // Replace with your Mailgun domain
    });
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const data = {
      from: 'your-email@example.com', // Replace with your email address
      to,
      subject,
      text,
    };

    await this.mailgun.messages().send(data);
  }
}
