import { Module } from '@nestjs/common';

import { DailyPricingService } from './dailyPricing.service';
import { DailyPricingResolver } from './dailyPricing.resolver';

@Module({
  providers: [DailyPricingResolver, DailyPricingService],
})
export class DailyPricingModule {}
