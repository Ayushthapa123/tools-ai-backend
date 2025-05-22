import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@src/guards/auth.guard';
import { HomestayRules } from '@src/models/global.model';
import { HomestayRulesService } from './homestayRules.service';
import { CreateRulesInput } from './dtos/create-rules.input';
import { UpdateRulesInput } from './dtos/update-rules.input';
import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';

@Resolver(() => HomestayRules)
export class HomestayRulesResolver {
  constructor(private readonly homestayRulesService: HomestayRulesService) {}

  @Query(() => HomestayRules, { name: 'getRulesById' })
  async getRulesById(
    @Args('rulesId', { type: () => Int }) rulesId: number,
  ): Promise<HomestayRules | null> {
    return this.homestayRulesService.getRulesById(rulesId);
  }

  @Query(() => HomestayRules, { name: 'getRulesByHomestay' })
  @UseGuards(AuthGuard)
  async getRulesByHomestay(@Context() ctx: any): Promise<HomestayRules | null> {
    const homestayId = ctx.user.homestayId;
    return this.homestayRulesService.getRulesByHomestayId(homestayId);
  }

  @Mutation(() => HomestayRules)
  async createRules(
    @Args('createRulesInput')
    createRulesInput: CreateRulesInput,
  ): Promise<HomestayRules> {
    return this.homestayRulesService.createRules(createRulesInput);
  }

  @Mutation(() => HomestayRules)
  async updateRules(
    @Args('rulesId', { type: () => Int }) rulesId: number,
    @Args('updateRulesInput')
    updateRulesInput: UpdateRulesInput,
  ): Promise<HomestayRules> {
    return this.homestayRulesService.updateRules(rulesId, updateRulesInput);
  }

  @Mutation(() => HomestayRules)
  async deleteRules(
    @Args('rulesId', { type: () => Int }) rulesId: number,
  ): Promise<HomestayRules> {
    return this.homestayRulesService.deleteRules(rulesId);
  }
}
