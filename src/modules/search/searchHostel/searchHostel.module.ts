import { Module } from '@nestjs/common';

import { SearchHostelService } from './searchHostel.service';
import { SearchHostelResolver } from './searchHostel.resolver';
import { DatabaseModule } from '@src/modules/databaseModule/database.module';

@Module({
  providers: [SearchHostelResolver, SearchHostelService],
  imports: [DatabaseModule],
})
export class SearchHostelsModule {}
