import { Module } from '@nestjs/common';

import { SocialsService } from './socialss.service';
import { SocialsResolver } from './socials.resolver';
import { PrismaService } from '@src/prisma/prisma.service';

@Module({
  providers: [SocialsResolver, SocialsService, PrismaService],
})
export class SocialsModule {}
