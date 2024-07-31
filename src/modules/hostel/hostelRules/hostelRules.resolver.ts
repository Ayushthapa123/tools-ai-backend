import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HostelRulesService } from './hostelRules.service';
import { CreateHostelRulesInput } from './dtos/create-hostelRules.input';
import { UpdateHostelRulesInput } from './dtos/update-hostelRules.input';
import { HostelRules } from '@src/models/global.model';

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
  async getHostelRulesByHostelId(
    @Args('hostelId', { type: () => Int }) hostelId: number,
  ): Promise<HostelRules | null> {
    return this.hostelRulesService.getHostelRulesByHostelId(hostelId);
  }

  @Mutation(() => HostelRules)
  async createHostelRules(
    @Args('createHostelRulesInput') createHostelRulesInput: CreateHostelRulesInput,
  ): Promise<HostelRules> {
    return this.hostelRulesService.createHostelRules(createHostelRulesInput);
  }

  @Mutation(() => HostelRules)
  async updateHostelRules(
    @Args('rulesId', { type: () => Int }) rulesId: number,
    @Args('updateHostelRulesInput') updateHostelRulesInput: UpdateHostelRulesInput,
  ): Promise<HostelRules> {
    return this.hostelRulesService.updateHostelRules(rulesId, updateHostelRulesInput);
  }

  @Mutation(() => HostelRules)
  async deleteHostelRules(
    @Args('rulesId', { type: () => Int }) rulesId: number,
  ): Promise<HostelRules> {
    return this.hostelRulesService.deleteHostelRules(rulesId);
  }
}
