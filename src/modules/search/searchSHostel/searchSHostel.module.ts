import { Module } from '@nestjs/common';

import { SearchSHostelService } from './searchSHostel.service';
import { SearchSHostelResolver } from './searchSHostel.resolver';

@Module({
  providers: [SearchSHostelResolver, SearchSHostelService],
  imports: [],
})
export class SearchSHostelsModule {}
