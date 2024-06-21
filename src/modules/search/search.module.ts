import { Module } from '@nestjs/common';
import { SearchHostelsModule } from './searchHostel/searchHostel.module';
import { SearchSuggestionsModule } from './searchSuggestions/searchSuggestions.module';

@Module({
  imports: [SearchHostelsModule, SearchSuggestionsModule],
})
export class SearchModule {}
