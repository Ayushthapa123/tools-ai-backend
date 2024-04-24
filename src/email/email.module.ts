// email/email.module.ts

import { Module } from '@nestjs/common';
import { MailerService } from './mailer/mailer.service';
import { SendGridService } from './mailer/sendGrid.service';
@Module({
  providers: [MailerService, SendGridService],
  exports: [MailerService, SendGridService], // Make MailerService available for injection in other modules
})
export class EmailModule {}
