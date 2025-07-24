import { Module } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { HostelApplicationFormService } from './hostelApplicationForm.service';
import { HostelApplicationFormResolver } from './hostelApplicationForm.resolver';
@Module({
  imports: [],
  providers: [
    HostelApplicationFormResolver,
    HostelApplicationFormService,
    JwtService,
  ],
})
export class HostelApplicationFormModule {}
