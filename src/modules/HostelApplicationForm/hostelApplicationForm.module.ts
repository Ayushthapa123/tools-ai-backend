import { Module } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { HostelApplicationFormService } from './hostelApplicationForm.service';
import { HostelApplicationFormResolver } from './hostelApplicationForm.resolver';
import { MailersendService } from '../mailersend/mailersend.service';
@Module({
  imports: [],
  providers: [
    HostelApplicationFormResolver,
    HostelApplicationFormService,
    JwtService,
    MailersendService,
  ],
})
export class HostelApplicationFormModule {}
