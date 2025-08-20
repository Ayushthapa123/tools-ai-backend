import { Module } from '@nestjs/common';
import { IoGenericService } from './io-generic.service';
import { IoGenericResolver } from './io-generic.resolver';

@Module({
  providers: [IoGenericService, IoGenericResolver],
})
export class IoGenericModule {}
