import { Module } from '@nestjs/common';
import { SavedToolService } from './savedTool.service';
import { SavedToolResolver } from './savedTool.resolver';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [SavedToolResolver, SavedToolService, JwtService],
})
export class SavedToolModule {}
