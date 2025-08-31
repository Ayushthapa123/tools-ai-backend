import { Module } from '@nestjs/common';
import { SearchListedAiToolModule } from './searchListedAiTools/searchListedAiTool.module';

@Module({
  imports: [SearchListedAiToolModule],
  exports: [SearchListedAiToolModule],
})
export class SearchModule {}
