import { Module } from '@nestjs/common';
import { ToolMetaDataService } from './tool-metadata.service';
import { ToolMetaDataResolver } from './tool-metadata.resolver';

@Module({
  providers: [ToolMetaDataResolver, ToolMetaDataService],
})
export class ToolMetaDataModule {}
