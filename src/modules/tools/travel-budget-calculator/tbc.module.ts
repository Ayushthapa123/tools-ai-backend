import { Module } from '@nestjs/common';
import { TbcService } from './tbc.service';
import { TbcResolver } from './tbc.resolver';

@Module({
  providers: [TbcService, TbcResolver],
})
export class TbcModule {}
