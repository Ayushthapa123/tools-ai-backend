import { UpdateMonthlyPricingInput } from './dtos/update-monthlyPricing.input';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateMonthlyPricingInput } from './dtos/create-monthlyPricing.input';
import { MonthlyPricing } from '@src/models/global.model';

@Injectable()
export class MonthlyPricingService {
  constructor(private readonly prisma: PrismaService) {}

  async getMonthlyPricingByHostelId(
    hostelId: number,
  ): Promise<MonthlyPricing | null> {
    return this.prisma.monthlyPricing.findUnique({
      where: { hostelId },
    });
  }

  async createmonthlyPricing(data: CreateMonthlyPricingInput) {
    return this.prisma.monthlyPricing.create({ data });
  }

  async updatemonthlyPricing(
    monthlyPricingId: number,
    data: UpdateMonthlyPricingInput,
  ) {
    return this.prisma.monthlyPricing.update({
      where: { monthlyPricingId },
      data,
    });
  }

  async deletemonthlyPricing(monthlyPricingId: number) {
    return this.prisma.monthlyPricing.delete({ where: { monthlyPricingId } });
  }
}
