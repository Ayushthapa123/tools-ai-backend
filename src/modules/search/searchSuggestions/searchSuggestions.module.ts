import { Module } from '@nestjs/common';

import { SearchSuggestionsService } from './searchSuggestions.service';
import { SearchSuggestionsResolver } from './searchSuggestions.resolver';
import { DatabaseModule } from '@src/modules/databaseModule/database.module';

@Module({
  providers: [SearchSuggestionsResolver, SearchSuggestionsService],
  imports: [DatabaseModule],
})
export class SearchSuggestionsModule {}
