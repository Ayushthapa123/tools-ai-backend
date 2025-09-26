import { Module } from '@nestjs/common';
import { SavedToolService } from './savedTool.service';
import { SavedToolResolver } from './savedTool.resolver';

@Module({
  providers: [SavedToolResolver, SavedToolService],
})
export class SavedToolModule {}
