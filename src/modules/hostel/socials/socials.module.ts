import { Module } from '@nestjs/common';

import { SocialsService } from './socialss.service';
import { SocialsResolver } from './socials.resolver';

@Module({
  providers: [SocialsResolver, SocialsService],
})
export class SocialsModule {}
