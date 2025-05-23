import { Module } from '@nestjs/common';
import { SearchQueriesService } from './search-queries.services';
import { SearchQueriesResolver } from './search-queries.resolver';

@Module({
  providers: [SearchQueriesService, SearchQueriesResolver],
})
export class SearchQueriesModule {}
