import { Module } from '@nestjs/common';

import { DailyPricingService } from './dailyPricing.service';
import { DailyPricingResolver } from './dailyPricing.resolver';
import { PrismaService } from '@src/prisma/prisma.service';

@Module({
  providers: [DailyPricingResolver, DailyPricingService, PrismaService],
})
export class DailyPricingModule {}
