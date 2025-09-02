import { Module } from '@nestjs/common';
import { DngService } from './dng.service';
import { DngResolver } from './dng.resolver';

@Module({
  providers: [DngService, DngResolver],
})
export class DngModule {}
