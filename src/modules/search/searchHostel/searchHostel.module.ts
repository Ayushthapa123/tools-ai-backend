import { Module } from '@nestjs/common';

import { SearchHostelService } from './searchHostel.service';
import { SearchHostelResolver } from './searchHostel.resolver';

@Module({
  providers: [SearchHostelResolver, SearchHostelService],
  imports: [],
})
export class SearchHostelsModule {}
