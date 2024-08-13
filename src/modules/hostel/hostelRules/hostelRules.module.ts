import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HostelRulesService } from './hostelRules.service';
import { HostelRulesResolver } from './hostelRules.resolver';

@Module({
  providers: [HostelRulesService, HostelRulesResolver, JwtService],
})
export class HostelRulesModule {}
