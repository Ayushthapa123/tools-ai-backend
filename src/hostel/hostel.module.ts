import { Module } from '@nestjs/common';

import { HostelService } from './hostel.service';
import { HostelResolver } from './hostel.resolver';
import { PrismaService } from '@src/prisma/prisma.service';

@Module({
  providers: [HostelResolver, HostelService, PrismaService],
})
export class HostelModule {}
