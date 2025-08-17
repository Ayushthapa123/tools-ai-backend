import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import * as SibApiV3Sdk from 'sib-api-v3-sdk';

// Constants
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const SENDER = {
  name: 'Hosteladmin',
  email: 'sagarregmi0710@gmail.com',
};

@Injectable()
export class MailersendService {
  private readonly logger = new Logger(MailersendService.name);
  private readonly apiInstance: SibApiV3Sdk.TransactionalEmailsApi;

  constructor(private readonly prismaService: PrismaService) {
    // Initialize Brevo client
    SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey =
      BREVO_API_KEY;
    this.apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  }

  private async sendEmail(
    sendSmtpEmail: SibApiV3Sdk.SendSmtpEmail,
  ): Promise<void> {
    try {
      const data = await this.apiInstance.sendTransacEmail(sendSmtpEmail);
      this.logger.log(`Email sent successfully: ${JSON.stringify(data)}`);
    } catch (error) {
      this.logger.error('Error sending email:', error);
      throw error;
    }
  }

  private createBaseEmail(to: {
    email: string;
    name: string;
  }): SibApiV3Sdk.SendSmtpEmail {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.sender = SENDER;
    sendSmtpEmail.to = [to];
    return sendSmtpEmail;
  }

  async sendEmailForVerification(
    email: string,
    token: string,
    name: string,
  ): Promise<void> {
    const sendSmtpEmail = this.createBaseEmail({ email, name });
    sendSmtpEmail.subject = 'Verify your email';
    sendSmtpEmail.htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color:rgb(151, 247, 231);">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color:rgb(255, 255, 255); border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #333333; margin: 0; font-size: 24px;">Welcome to hosteladmin.com!</h1>
            </div>              
            <div style="color: #666666; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
              <p>Thank you for joining our community! We're excited to have you on board.</p>
              <p>To get started, please verify your email address by clicking the button below:</p>
            </div>
            <div style="display:flex; align-items:center;justify-content:center; margin: 30px 0;">
              <a href="${process.env.WEB_URL}/auth/verify-email?token=${token}" 
                style="background-color: #4CAF50; color: white; padding: 14px 28px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">
                Verify Email Address
              </a>
            </div>
            <div style="color: #666666; font-size: 14px; line-height: 1.6; margin-top: 25px;">
              <p>If the button above doesn't work, you can also copy and paste this link into your browser:</p>
              <p style="word-break: break-all; color: #4CAF50;">${process.env.WEB_URL}/auth/verify-email?token=${token}</p>
            </div>
            <div style="text-align:center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eeeeee; color: #999999; font-size: 12px;">
              <p>This verification link will expire in 24 hours.</p>
              <p>If you didn't create an account with Hosteladmin.com, you can safely ignore this email.</p>
            </div>
          </div>            
          <div style="text-align: center; margin-top: 20px; color: #999999; font-size: 12px;">
            <p>&copy; ${new Date().getFullYear()} Hosteladmin.com. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await this.sendEmail(sendSmtpEmail);
  }

  async sendEmailForForgotPassword(
    email: string,
    name: string,
    token: string,
  ): Promise<void> {
    const sendSmtpEmail = this.createBaseEmail({ email, name: name });
    sendSmtpEmail.subject = 'Reset new password : hosteladmin.com';
    sendSmtpEmail.htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset Request</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color:rgb(151, 247, 231);">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color:rgb(255, 255, 255); border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #333333; margin: 0; font-size: 24px;">Password Reset Request</h1>
            </div>
            <div style="color: #666666; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
              <p>We received a request to reset your password for your Hosteladmin.com account.</p>
              <p>Click the button below to reset your password:</p>
            </div>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.WEB_URL}/auth/forgot-password?token=${token}" 
                style="background-color: #4CAF50; color: white; padding: 14px 28px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">
                Reset Password
              </a>
            </div>
            <div style="color: #666666; font-size: 14px; line-height: 1.6; margin-top: 25px;">
              <p>If the button above doesn't work, you can also copy and paste this link into your browser:</p>
              <p style="word-break: break-all; color: #4CAF50;">${process.env.WEB_URL}/auth/forgot-password?token=${token}</p>
            </div>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eeeeee; color: #999999; font-size: 12px;">
              <p>This password reset link will expire in 1 hour.</p>
              <p>If you didn't request a password reset, you can safely ignore this email.</p>
            </div>
          </div>
          <div style="text-align: center; margin-top: 20px; color: #999999; font-size: 12px;">
            <p>&copy; ${new Date().getFullYear()} Hosteladmin.com. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await this.sendEmail(sendSmtpEmail);
  }

  async sendCustomEmail(
    email: string,
    name: string,
    subject: string,
    htmlContent: string,
  ): Promise<boolean> {
    try {
      const sendSmtpEmail = this.createBaseEmail({ email, name: name });
      sendSmtpEmail.subject = subject;
      sendSmtpEmail.htmlContent = htmlContent;
      await this.sendEmail(sendSmtpEmail);
      return true;
    } catch (error) {
      this.logger.error('Error sending email:', error);
      return false;
    }
  }
}
