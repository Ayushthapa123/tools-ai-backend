import { Module } from '@nestjs/common';
import { AmenityOptionModule } from './amenityOption/amenity-option.module';
import { RoomAmenityOptionModule } from './roomAmenityOption/amenity-option.module';
import { ServiceOptionModule } from './serviceOption/service-option.module';

@Module({
  imports: [AmenityOptionModule, RoomAmenityOptionModule, ServiceOptionModule],
})
export class SuperadminModule {}
