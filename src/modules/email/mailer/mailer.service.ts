import { Injectable } from '@nestjs/common';
import * as mailgun from 'mailgun-js';

@Injectable()
export class MailerService {
  private mailgun: mailgun.Mailgun;

  constructor() {
    this.mailgun = mailgun({
      apiKey: '50944a5ede29cb9ee2bac0e0a7d60ef4-19806d14-00853ef6',
      domain: 'sandboxecb81858df804d8aa82a9a98aaa5d884.mailgun.org',
    });
  }

  async sendEmail(link: string, to?: string, subject?: string): Promise<void> {
    await this.mailgun.messages().send({
      to: 'ayushthapamgr007@gmail.com', //verified emails only
      from: 'The Art of ren thapaaayush115@gmail.com', //verified email in sendGrid
      subject: subject ?? 'hello ayush',
      text: 'text',
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #333;
        }
        p {
            color: #555;
            line-height: 1.6;
        }
        .btn {
            display: inline-block;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }
        .btn:hover {
            background-color: #0056b3;
        }
        .footer {
            margin-top: 20px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Hello,</h2>
        <p>Thank you for your interest!</p>
        <p>Please click the button below to verify your email address:</p>
        <a href=${link} class="btn">Verify Email</a>
        <p>If you did not request this verification, you can safely ignore this email.</p>
        <div class="footer">
            Regards,<br>Your Name
        </div>
    </div>
</body>
</html>
`,
    });
  }
}
