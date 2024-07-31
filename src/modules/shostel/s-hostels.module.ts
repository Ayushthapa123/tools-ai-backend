import { Module } from '@nestjs/common';


import { SHostelsResolver } from './s-hostels.resolver';
import { SHostelsService } from './s-hostels.service';

@Module({
  providers: [SHostelsResolver, SHostelsService],
})
export class SHostelModule {}
