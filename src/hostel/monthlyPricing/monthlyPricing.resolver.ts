import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { MonthlyPricingService } from './monthlyPricing.service';
import { MonthlyPricing } from '@src/models/global.model';
import { CreateMonthlyPricingInput } from './dtos/create-monthlyPricing.input';
import { UpdateMonthlyPricingInput } from './dtos/update-monthlyPricing.input';

// import { Controller, createParamDecorator } from '@nestjs/common';

@Resolver(() => MonthlyPricing)
// @Controller('hostel') // thats not possible to just create hostel namespace I guess. It must have something
export class MonthlyPricingResolver {
  constructor(private readonly pricingService: MonthlyPricingService) {}

  @Query(() => MonthlyPricing, { nullable: true })
  async getMonthlyPricingByHostelId(
    @Args('hostelId') hostelId: number,
  ): Promise<MonthlyPricing | null> {
    return this.pricingService.getMonthlyPricingByHostelId(hostelId);
  }

  @Mutation(() => MonthlyPricing)
  async createMonthlyPricing(
    @Args('data') data: CreateMonthlyPricingInput,
  ): Promise<MonthlyPricing> {
    return this.pricingService.createmonthlyPricing(data);
  }

  @Mutation(() => MonthlyPricing)
  async updateMonthlyPricing(
    @Args('monthlyPricingId') monthlyPricingId: number,
    @Args('data') data: UpdateMonthlyPricingInput,
  ): Promise<MonthlyPricing> {
    return this.pricingService.updatemonthlyPricing(monthlyPricingId, data);
  }
}
