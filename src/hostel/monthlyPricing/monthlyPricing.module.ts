import { Module } from '@nestjs/common';

import { MonthlyPricingService } from './monthlyPricing.service';
import { MonthlyPricingResolver } from './monthlyPricing.resolver';
import { PrismaService } from '@src/prisma/prisma.service';

@Module({
  providers: [MonthlyPricingResolver, MonthlyPricingService, PrismaService],
})
export class MonthlyPricingModule {}
