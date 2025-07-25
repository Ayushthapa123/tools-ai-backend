import { Module } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { HostelSearchFormService } from './hostelSearchForm.service';
import { HostelSearchFormResolver } from './hostelSearchForm.resolver';
import { MailersendService } from '../mailersend/mailersend.service';
@Module({
  imports: [],
  providers: [
    HostelSearchFormResolver,
    HostelSearchFormService,
    JwtService,
    MailersendService,
  ],
})
export class HostelSearchFormModule {}
