import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { SearchListedAiToolService } from './searchListedAiTool.service';
import { ListedAiToolList, ListedAiToolData } from '@src/models/global.model';
import { SearchListedAiToolInput } from './dtos/search-listed-ai-tool.input';
import { Domain } from '@prisma/client';

@Resolver(() => ListedAiToolData)
export class SearchListedAiToolResolver {
  constructor(
    private readonly searchListedAiToolService: SearchListedAiToolService,
  ) {}

  @Query(() => ListedAiToolList)
  async searchListedAiTools(@Args('input') input: SearchListedAiToolInput) {
    return this.searchListedAiToolService.searchListedAiTools(input);
  }

  @Query(() => ListedAiToolList)
  async getPopularAiTools(
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
  ) {
    return this.searchListedAiToolService.getPopularAiTools(limit);
  }

  @Query(() => ListedAiToolList)
  async getFeaturedAiTools(
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
  ) {
    return this.searchListedAiToolService.getFeaturedAiTools(limit);
  }

  @Query(() => ListedAiToolList)
  async getAiToolsByDomain(
    @Args('domain') domain: Domain,
    @Args('limit', { type: () => Int, defaultValue: 20 }) limit: number,
  ) {
    return this.searchListedAiToolService.getAiToolsByDomain(domain, limit);
  }
}
