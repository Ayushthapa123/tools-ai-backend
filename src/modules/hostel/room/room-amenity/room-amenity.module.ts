import { Module } from '@nestjs/common';
import { RoomAmenityService } from './room-amenity.service';
import { RoomAmenityResolver } from './room-amenity.resolver';

@Module({
  providers: [RoomAmenityResolver, RoomAmenityService],
})
export class RoomAmenityModule {}
