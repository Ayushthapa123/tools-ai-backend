import { UpdateDailyPricingInput } from './dtos/update-dailyPricing.input';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateDailyPricingInput } from './dtos/create-dailyPricing.input';
import { DailyPricing } from '@src/models/global.model';

@Injectable()
export class DailyPricingService {
  constructor(private readonly prisma: PrismaService) {}

  async getDailyPricingByHostelId(
    hostelId: number,
  ): Promise<DailyPricing | null> {
    return this.prisma.dailyPricing.findUnique({
      where: { hostelId },
    });
  }

  async createdailyPricing(data: CreateDailyPricingInput) {
    return this.prisma.dailyPricing.create({ data });
  }

  async updatedailyPricing(
    dailyPricingId: number,
    data: UpdateDailyPricingInput,
  ) {
    return this.prisma.dailyPricing.update({ where: { dailyPricingId }, data });
  }

  async deletedailyPricing(dailyPricingId: number) {
    return this.prisma.dailyPricing.delete({ where: { dailyPricingId } });
  }
}
