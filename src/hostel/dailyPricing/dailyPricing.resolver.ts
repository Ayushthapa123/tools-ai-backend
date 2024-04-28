import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { DailyPricingService } from './dailyPricing.service';
import { DailyPricing } from '@src/models/global.model';
import { CreateDailyPricingInput } from './dtos/create-dailyPricing.input';
import { UpdateDailyPricingInput } from './dtos/update-dailyPricing.input';

// import { Controller, createParamDecorator } from '@nestjs/common';

@Resolver(() => DailyPricing)
// @Controller('hostel') // thats not possible to just create hostel namespace I guess. It must have something
export class DailyPricingResolver {
  constructor(private readonly pricingService: DailyPricingService) {}

  @Query(() => DailyPricing, { nullable: true })
  async getDailyPricingByHostelId(
    @Args('hostelId') hostelId: number,
  ): Promise<DailyPricing | null> {
    return this.pricingService.getDailyPricingByHostelId(hostelId);
  }

  @Mutation(() => DailyPricing)
  async createDailyPricing(
    @Args('data') data: CreateDailyPricingInput,
  ): Promise<DailyPricing> {
    return this.pricingService.createdailyPricing(data);
  }

  @Mutation(() => DailyPricing)
  async updateDailyPricing(
    @Args('addressId') addressId: number,
    @Args('data') data: UpdateDailyPricingInput,
  ): Promise<DailyPricing> {
    return this.pricingService.updatedailyPricing(addressId, data);
  }
}
