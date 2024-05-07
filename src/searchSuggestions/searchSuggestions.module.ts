import { Module } from '@nestjs/common';

import { SearchSuggestionsService } from './searchSuggestions.service';
import { SearchSuggestionsResolver } from './searchSuggestions.resolver';
import { PrismaService } from '@src/prisma/prisma.service';

@Module({
  providers: [
    SearchSuggestionsResolver,
    SearchSuggestionsService,
    PrismaService,
  ],
})
export class SearchSuggestionsModule {}
