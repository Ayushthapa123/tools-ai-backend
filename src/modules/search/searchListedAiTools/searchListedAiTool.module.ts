import { Module } from '@nestjs/common';
import { SearchListedAiToolService } from './searchListedAiTool.service';
import { SearchListedAiToolResolver } from './searchListedAiTool.resolver';

@Module({
  providers: [SearchListedAiToolResolver, SearchListedAiToolService],
  exports: [SearchListedAiToolService],
})
export class SearchListedAiToolModule {}
