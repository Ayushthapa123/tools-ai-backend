import { Module } from '@nestjs/common';
import { SearchHostelsModule } from './searchHostel/searchHostel.module';
import { SearchSuggestionsModule } from './searchSuggestions/searchSuggestions.module';
import { DatabaseModule } from '../databaseModule/database.module';

@Module({
  imports: [SearchHostelsModule, SearchSuggestionsModule, DatabaseModule],
})
export class SearchModule {}
