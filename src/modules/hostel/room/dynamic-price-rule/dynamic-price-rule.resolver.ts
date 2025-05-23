import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { DynamicPriceRuleService } from './dynamic-price-rule.service';

import { CreateDynamicPriceRuleInput } from './dtos/create-dynamic-price-rule.input';
import { UpdateDynamicPriceRuleInput } from './dtos/update-dynamic-price-rule.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@src/guards/auth.guard';
import {
  DynamicPricingRule,
  DynamicPricingRuleList,
} from '@src/models/global.model';

@Resolver(() => DynamicPricingRule)
export class DynamicPriceRuleResolver {
  constructor(private readonly priceService: DynamicPriceRuleService) {}

  @Mutation(() => DynamicPricingRule)
  @UseGuards(AuthGuard)
  createPriceRule(
    @Args('createPriceRuleInput')
    createPriceRuleInput: CreateDynamicPriceRuleInput,
    @Context() ctx: any,
  ) {
    if (!ctx.user?.hostelId) {
      return {
        error: {
          message: 'User does not have a hostel associated',
        },
      };
    }
    return this.priceService.create(createPriceRuleInput, ctx.user.hostelId);
  }

  @Query(() => DynamicPricingRuleList, { name: 'pricesRules' })
  findAll() {
    return this.priceService.findAll();
  }

  @Query(() => DynamicPricingRule, { name: 'priceRule' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.priceService.findOne(id);
  }

  @Query(() => DynamicPricingRuleList, { name: 'priceRulesByRoom' })
  findPriceRulesByRoomId(@Args('roomId', { type: () => Int }) roomId: number) {
    return this.priceService.findPriceRulesByRoomId(roomId);
  }

  @Mutation(() => DynamicPricingRule)
  @UseGuards(AuthGuard)
  updatePriceRule(
    @Args('updatePriceInput') updatePriceInput: UpdateDynamicPriceRuleInput,
    @Context() ctx: any,
  ) {
    if (!ctx.user?.hostelId) {
      throw new Error('User does not have a hostel associated');
    }
    return this.priceService.update(updatePriceInput, ctx.user.hostelId);
  }

  @Mutation(() => DynamicPricingRule)
  @UseGuards(AuthGuard)
  removePriceRule(
    @Args('id', { type: () => Int }) id: number,
    @Context() ctx: any,
  ) {
    if (!ctx.user?.hostelId) {
      throw new Error('User does not have a hostel associated');
    }
    return this.priceService.remove(id, ctx.user.hostelId);
  }
}
