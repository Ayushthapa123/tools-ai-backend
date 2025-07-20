import { Module } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { HostelSellFormService } from './hostelSellForm.service';
import { HostelSellFormResolver } from './hostelSellForm.resolver';
@Module({
  imports: [],
  providers: [HostelSellFormResolver, HostelSellFormService, JwtService],
})
export class HostelSellFormModule {}
