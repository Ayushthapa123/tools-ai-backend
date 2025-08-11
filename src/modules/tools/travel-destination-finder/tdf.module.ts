import { Module } from '@nestjs/common';
import { TdfService } from './tdf.service';
import { TdfResolver } from './tdf.resolver';

@Module({
  providers: [TdfService, TdfResolver],
})
export class TdfModule {}
