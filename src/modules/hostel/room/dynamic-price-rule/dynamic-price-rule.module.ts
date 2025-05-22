import { Module } from '@nestjs/common';
import { DynamicPriceRuleService } from './dynamic-price-rule.service';
import { DynamicPriceRuleResolver } from './dynamic-price-rule.resolver';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [DynamicPriceRuleResolver, DynamicPriceRuleService, JwtService],
  exports: [DynamicPriceRuleService],
})
export class DynamicPriceRuleModule {}
