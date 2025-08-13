import { Module } from '@nestjs/common';
import { CagService } from './cag.service';
import { CagResolver } from './cag.resolver';

@Module({
  providers: [CagService, CagResolver],
})
export class CagModule {}
