import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@src/guards/auth.guard';
import { HostelRules } from '@src/models/global.model';
import { HostelRulesService } from './hostelRules.service';
import { CreateRulesInput } from './dtos/create-rules.input';
import { UpdateRulesInput } from './dtos/update-rules.input';
import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';

@Resolver(() => HostelRules)
export class HostelRulesResolver {
  constructor(private readonly hostelRulesService: HostelRulesService) {}

  @Query(() => HostelRules, { name: 'getRulesById' })
  async getRulesById(
    @Args('rulesId', { type: () => Int }) rulesId: number,
  ): Promise<HostelRules | null> {
    return this.hostelRulesService.getRulesById(rulesId);
  }

  @Query(() => HostelRules, { name: 'getRulesByHostel' })
  @UseGuards(AuthGuard)
  async getRulesByHostel(@Context() ctx: any): Promise<HostelRules | null> {
    const hostelId = ctx.user.hostelId;
    return this.hostelRulesService.getRulesByHostelId(hostelId);
  }

  @Mutation(() => HostelRules)
  async createRules(
    @Args('createRulesInput')
    createRulesInput: CreateRulesInput,
  ): Promise<HostelRules> {
    return this.hostelRulesService.createRules(createRulesInput);
  }

  @Mutation(() => HostelRules)
  async updateRules(
    @Args('rulesId', { type: () => Int }) rulesId: number,
    @Args('updateRulesInput')
    updateRulesInput: UpdateRulesInput,
  ): Promise<HostelRules> {
    return this.hostelRulesService.updateRules(rulesId, updateRulesInput);
  }

  @Mutation(() => HostelRules)
  async deleteRules(
    @Args('rulesId', { type: () => Int }) rulesId: number,
  ): Promise<HostelRules> {
    return this.hostelRulesService.deleteRules(rulesId);
  }
}
