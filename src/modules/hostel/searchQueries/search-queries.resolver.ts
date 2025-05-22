import { SearchQueries } from '@src/models/global.model';
import { SearchQueriesService } from './search-queries.services';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreateSearchQueriesInput } from './dtos/create-search-queries.input';
import { UpdateSearchQueriesInput } from './dtos/update-search-queries.input';

@Resolver(() => SearchQueries)
export class SearchQueriesResolver {
  constructor(private readonly searchQueriesService: SearchQueriesService) {}

  @Query(() => SearchQueries, { name: 'searchQuery' })
  async getSearchQueryById(
    @Args('searchQueryId', { type: () => Int }) searchQueryId: number,
  ): Promise<SearchQueries | null> {
    return this.searchQueriesService.getSearchQueryById(searchQueryId);
  }

  @Query(() => [SearchQueries], { name: 'searchQueries' })
  async getSearchQueries(
    @Args('query', { type: () => String }) query: string,
  ): Promise<SearchQueries> {
    return this.searchQueriesService.getSearchQueries(query);
  }

  @Query(() => [SearchQueries], { name: 'getAllSearchQueries' })
  async getAllSearchQueries(): Promise<SearchQueries> {
    return this.searchQueriesService.getAllSearchQueries();
  }

  @Mutation(() => SearchQueries)
  async createSearchQuery(
    @Args('createSearchQueriesInput')
    createSearchQueriesInput: CreateSearchQueriesInput,
  ): Promise<SearchQueries | null> {
    return this.searchQueriesService.createSearchQuery(
      createSearchQueriesInput,
    );
  }

  @Mutation(() => SearchQueries)
  async updateSearchQuery(
    @Args('searchQueryId', { type: () => Int }) searchQueryId: number,
    @Args('updateSearchQueriesInput')
    updateSearchQueriesInput: UpdateSearchQueriesInput,
  ): Promise<SearchQueries> {
    return this.searchQueriesService.updateSearchQuery(
      searchQueryId,
      updateSearchQueriesInput,
    );
  }

  @Mutation(() => SearchQueries)
  async deleteSearchQuery(
    @Args('searchQueryId', { type: () => Int }) searchQueryId: number,
  ): Promise<SearchQueries> {
    return this.searchQueriesService.deleteSearchQuery(searchQueryId);
  }
}
