import { Module } from '@nestjs/common';
import { RoomAmenityOptionService } from './amenity-option.services';
import { RoomAmenityOptionResolver } from './amenity-option.resolver';

@Module({
  providers: [RoomAmenityOptionService, RoomAmenityOptionResolver],
})
export class RoomAmenityOptionModule {}
