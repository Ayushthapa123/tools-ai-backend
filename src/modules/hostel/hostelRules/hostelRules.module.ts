import { Module } from '@nestjs/common';
import { HostelRulesService } from './hostelRules.service';
import { HostelRulesResolver } from './hostelRules.resolver';

@Module({
  providers: [HostelRulesService, HostelRulesResolver],
})
export class HostelRulesModule {}
