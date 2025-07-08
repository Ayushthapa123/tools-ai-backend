import { Module } from '@nestjs/common';
import { RoomAmenityService } from './room-amenity.service';
import { RoomAmenityResolver } from './room-amenity.resolver';
import { PrismaService } from '@src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
@Module({
  providers: [
    RoomAmenityResolver,
    RoomAmenityService,
    PrismaService,
    JwtService,
  ],
})
export class RoomAmenityModule {}
