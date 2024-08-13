import { Module } from '@nestjs/common';

import { SHostelsService } from './s-hostels.service';
import { SHostelsResolver } from './s-hostels.resolver';

@Module({
  providers: [SHostelsResolver, SHostelsService],
})
export class SHostelModule {}
