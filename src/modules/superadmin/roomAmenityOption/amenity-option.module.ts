import { Module } from '@nestjs/common';
import { RoomAmenityOptionService } from './amenity-option.services';
import { RoomAmenityOptionResolver } from './amenity-option.resolver';
import { AuthGuard } from '@src/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
@Module({
  providers: [
    RoomAmenityOptionService,
    RoomAmenityOptionResolver,
    AuthGuard,
    JwtService,
  ],
})
export class RoomAmenityOptionModule {}
