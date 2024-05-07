import { Resolver, Query, Args } from '@nestjs/graphql';
import { SearchSuggestionsService } from './searchSuggestions.service';
import { SearchQuerys } from '@src/models/global.model';

@Resolver(() => SearchQuerys)
// @Controller('hostel') // thats not possible to just create hostel namespace I guess. It must have something
export class SearchSuggestionsResolver {
  constructor(
    private readonly searchSuggestionsService: SearchSuggestionsService,
  ) {}

  @Query(() => [SearchQuerys], { nullable: true })
  async getHostelSearchSuggestions(
    @Args('query') query: string,
  ): Promise<SearchQuerys[] | null> {
    return this.searchSuggestionsService.getSearchSuggestions(query);
  }

  @Query(() => [SearchQuerys], { nullable: true })
  async getCitySearchSuggestions(
    @Args('query') query: string,
  ): Promise<SearchQuerys[] | null> {
    return this.searchSuggestionsService.getCitySuggestions(query);
  }

  @Query(() => [SearchQuerys], { nullable: true })
  async getToleSearchSuggestions(
    @Args('query') query: string,
  ): Promise<SearchQuerys[] | null> {
    return this.searchSuggestionsService.getToleSuggestions(query);
  }
}
