import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class SendGridService {
  constructor() {
    sgMail.setApiKey(
      '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',
    );
  }

  async sendEmail(link: string, to?: string, subject?: string): Promise<void> {
    await sgMail.send({
      to: to || 'ayushthapamgr007@gmail.com', // Default to a fallback email if `to` is not provided
      from: { email: '<from>' }, // Replace with your verified email in SendGrid
      subject: subject ?? 'Hello Ayush',
      text: 'Text',
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
        <a href="${link}" class="btn">Verify Email</a>
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
