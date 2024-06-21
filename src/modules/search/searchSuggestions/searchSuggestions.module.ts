import { Module } from '@nestjs/common';

import { SearchSuggestionsService } from './searchSuggestions.service';
import { SearchSuggestionsResolver } from './searchSuggestions.resolver';

@Module({
  providers: [SearchSuggestionsResolver, SearchSuggestionsService],
  imports: [],
})
export class SearchSuggestionsModule {}
