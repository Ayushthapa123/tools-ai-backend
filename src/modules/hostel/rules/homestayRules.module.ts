import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HomestayRulesService } from './homestayRules.service';
import { HomestayRulesResolver } from './homestayRules.resolver';

@Module({
  providers: [HomestayRulesService, HomestayRulesResolver, JwtService],
})
export class HomestayRulesModule {}
