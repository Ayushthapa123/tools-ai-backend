import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { DynamicPriceRuleService } from './dynamic-price-rule.service';

import { CreateDynamicPriceRuleInput } from './dtos/create-dynamic-price-rule.input';
import { UpdateDynamicPriceRuleInput } from './dtos/update-dynamic-price-rule.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@src/guards/auth.guard';
import {
  DynamicPriceRule as DynamicPriceRuleResponse,
  // DynamicPricingRule,
} from '@src/models/global.model';

@Resolver(() => DynamicPriceRuleResponse)
export class DynamicPriceRuleResolver {
  constructor(private readonly priceService: DynamicPriceRuleService) {}

  @Mutation(() => DynamicPriceRuleResponse)
  @UseGuards(AuthGuard)
  createPriceRule(
    @Args('createPriceRuleInput')
    createPriceRuleInput: CreateDynamicPriceRuleInput,
    @Context() ctx: any,
  ) {
    if (!ctx.user?.homestayId) {
      return {
        error: {
          message: 'User does not have a homestay associated',
        },
      };
    }
    return this.priceService.create(createPriceRuleInput, ctx.user.homestayId);
  }

  @Query(() => [DynamicPriceRuleResponse], { name: 'pricesRules' })
  findAll() {
    return this.priceService.findAll();
  }

  @Query(() => DynamicPriceRuleResponse, { name: 'priceRule' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.priceService.findOne(id);
  }

  @Query(() => [DynamicPriceRuleResponse], { name: 'priceRulesByRoom' })
  findPriceRulesByRoomId(@Args('roomId', { type: () => Int }) roomId: number) {
    return this.priceService.findPriceRulesByRoomId(roomId);
  }

  @Mutation(() => DynamicPriceRuleResponse)
  @UseGuards(AuthGuard)
  updatePriceRule(
    @Args('updatePriceInput') updatePriceInput: UpdateDynamicPriceRuleInput,
    @Context() ctx: any,
  ) {
    if (!ctx.user?.homestayId) {
      throw new Error('User does not have a homestay associated');
    }
    return this.priceService.update(updatePriceInput, ctx.user.homestayId);
  }

  @Mutation(() => DynamicPriceRuleResponse)
  @UseGuards(AuthGuard)
  removePriceRule(
    @Args('id', { type: () => Int }) id: number,
    @Context() ctx: any,
  ) {
    if (!ctx.user?.homestayId) {
      throw new Error('User does not have a homestay associated');
    }
    return this.priceService.remove(id, ctx.user.homestayId);
  }
}
