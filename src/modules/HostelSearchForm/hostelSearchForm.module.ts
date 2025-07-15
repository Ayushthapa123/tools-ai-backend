import { Module } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { HostelSearchFormService } from './hostelSearchForm.service';
import { HostelSearchFormResolver } from './hostelSearchForm.resolver';
@Module({
  imports: [],
  providers: [HostelSearchFormResolver, HostelSearchFormService, JwtService],
})
export class HostelSearchFormModule {}
