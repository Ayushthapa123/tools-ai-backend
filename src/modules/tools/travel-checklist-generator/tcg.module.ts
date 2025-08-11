import { Module } from '@nestjs/common';
import { TcgService } from './tcg.service';
import { TcgResolver } from './tcg.resolver';

@Module({
  providers: [TcgService, TcgResolver],
})
export class TcgModule {}
