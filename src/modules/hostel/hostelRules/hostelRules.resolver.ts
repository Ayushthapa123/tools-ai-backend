import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@src/guards/auth.guard';
import { HostelRules } from '@src/models/global.model';
import { HostelRulesService } from './hostelRules.service';
import { CreateHostelRulesInput } from './dtos/create-hostelRules.input';
import { UpdateHostelRulesInput } from './dtos/update-hostelRules.input';
import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';

@Resolver(() => HostelRules)
export class HostelRulesResolver {
  constructor(private readonly hostelRulesService: HostelRulesService) {}

  @Query(() => HostelRules, { name: 'hostelRules' })
  async getHostelRulesById(
    @Args('rulesId', { type: () => Int }) rulesId: number,
  ): Promise<HostelRules | null> {
    return this.hostelRulesService.getHostelRulesById(rulesId);
  }

  @Query(() => HostelRules, { name: 'hostelRulesByHostelId' })
  @UseGuards(AuthGuard)
  async getHostelRulesByHostelId(
    @Context() ctx: any,
  ): Promise<HostelRules | null> {
    const hostelId = ctx.user.hostelId;
    return this.hostelRulesService.getHostelRulesByHostelId(hostelId);
  }

  @Mutation(() => HostelRules)
  async createHostelRules(
    @Args('createHostelRulesInput')
    createHostelRulesInput: CreateHostelRulesInput,
  ): Promise<HostelRules> {
    return this.hostelRulesService.createHostelRules(createHostelRulesInput);
  }

  @Mutation(() => HostelRules)
  async updateHostelRules(
    @Args('rulesId', { type: () => Int }) rulesId: number,
    @Args('updateHostelRulesInput')
    updateHostelRulesInput: UpdateHostelRulesInput,
  ): Promise<HostelRules> {
    return this.hostelRulesService.updateHostelRules(
      rulesId,
      updateHostelRulesInput,
    );
  }

  @Mutation(() => HostelRules)
  async deleteHostelRules(
    @Args('rulesId', { type: () => Int }) rulesId: number,
  ): Promise<HostelRules> {
    return this.hostelRulesService.deleteHostelRules(rulesId);
  }
}
