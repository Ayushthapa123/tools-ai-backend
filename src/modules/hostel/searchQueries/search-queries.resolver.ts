import { SearchQuery } from '@src/models/global.model';
import { SearchQueriesService } from './search-queries.services';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreateSearchQueriesInput } from './dtos/create-search-queries.input';
import { UpdateSearchQueriesInput } from './dtos/update-search-queries.input';

@Resolver(() => SearchQuery)
export class SearchQueriesResolver {
  constructor(private readonly searchQueriesService: SearchQueriesService) {}

  @Query(() => SearchQuery, { name: 'searchQuery' })
  async getSearchQueryById(
    @Args('searchQueryId', { type: () => Int }) searchQueryId: number,
  ): Promise<SearchQuery | null> {
    return this.searchQueriesService.getSearchQueryById(searchQueryId);
  }

  @Query(() => [SearchQuery], { name: 'searchQueries' })
  async getSearchQueries(
    @Args('query', { type: () => String }) query: string,
  ): Promise<SearchQuery> {
    return this.searchQueriesService.getSearchQueries(query);
  }

  @Query(() => [SearchQuery], { name: 'getAllSearchQueries' })
  async getAllSearchQueries(): Promise<SearchQuery> {
    return this.searchQueriesService.getAllSearchQueries();
  }

  @Mutation(() => SearchQuery)
  async createSearchQuery(
    @Args('createSearchQueriesInput')
    createSearchQueriesInput: CreateSearchQueriesInput,
  ): Promise<SearchQuery | null> {
    return this.searchQueriesService.createSearchQuery(
      createSearchQueriesInput,
    );
  }

  @Mutation(() => SearchQuery)
  async updateSearchQuery(
    @Args('searchQueryId', { type: () => Int }) searchQueryId: number,
    @Args('updateSearchQueriesInput')
    updateSearchQueriesInput: UpdateSearchQueriesInput,
  ): Promise<SearchQuery> {
    return this.searchQueriesService.updateSearchQuery(
      searchQueryId,
      updateSearchQueriesInput,
    );
  }

  @Mutation(() => SearchQuery)
  async deleteSearchQuery(
    @Args('searchQueryId', { type: () => Int }) searchQueryId: number,
  ): Promise<SearchQuery> {
    return this.searchQueriesService.deleteSearchQuery(searchQueryId);
  }
}
