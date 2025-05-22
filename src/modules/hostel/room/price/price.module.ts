import { Module } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceResolver } from './price.resolver';
import { JwtService } from '@nestjs/jwt';
import { DynamicPriceRuleModule } from '../dynamic-price-rule/dynamic-price-rule.module';

@Module({
  providers: [PriceResolver, PriceService, JwtService],
  exports: [PriceService],
  imports: [DynamicPriceRuleModule],
})
export class PriceModule {}
