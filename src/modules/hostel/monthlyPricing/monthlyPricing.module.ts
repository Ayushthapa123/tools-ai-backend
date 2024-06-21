import { Module } from '@nestjs/common';

import { MonthlyPricingService } from './monthlyPricing.service';
import { MonthlyPricingResolver } from './monthlyPricing.resolver';

@Module({
  providers: [MonthlyPricingResolver, MonthlyPricingService],
})
export class MonthlyPricingModule {}
