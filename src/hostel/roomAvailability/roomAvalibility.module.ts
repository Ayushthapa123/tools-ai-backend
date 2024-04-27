import { Module } from '@nestjs/common';

import { RoomAvailibilityService } from './roomAvailibility.service';
import { RoomAvailibilityResolver } from './roomAvailibility.resolver';
import { PrismaService } from '@src/prisma/prisma.service';

@Module({
  providers: [RoomAvailibilityResolver, RoomAvailibilityService, PrismaService],
})
export class RoomAvailibilityModule {}
