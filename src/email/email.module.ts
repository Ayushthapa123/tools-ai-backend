// email/email.module.ts

import { Module } from '@nestjs/common';
import { MailerService } from './mailer/mailer.service';

@Module({
  providers: [MailerService],
  exports: [MailerService], // Make MailerService available for injection in other modules
})
export class EmailModule {}
