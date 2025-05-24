import { Resolver, Query, Args } from '@nestjs/graphql';
import { SearchSuggestionsService } from './searchSuggestions.service';
import { SearchQuery } from '@src/models/global.model';

@Resolver(() => SearchQuery)
export class SearchSuggestionsResolver {
  constructor(
    private readonly searchSuggestionsService: SearchSuggestionsService,
  ) {}

  @Query(() => [SearchQuery], { nullable: true })
  async getHostelSearchSuggestions(
    @Args('query') query: string,
  ): Promise<SearchQuery | null> {
    return this.searchSuggestionsService.getSearchSuggestions(query);
  }

  @Query(() => [SearchQuery], { nullable: true })
  async getCitySearchSuggestions(
    @Args('query') query: string,
  ): Promise<SearchQuery | null> {
    return this.searchSuggestionsService.getCitySuggestions(query);
  }

  @Query(() => [SearchQuery], { nullable: true })
  async getToleSearchSuggestions(
    @Args('query') query: string,
  ): Promise<SearchQuery | null> {
    return this.searchSuggestionsService.getToleSuggestions(query);
  }
}
