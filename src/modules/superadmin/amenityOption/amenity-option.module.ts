import { Module } from '@nestjs/common';
import { AmenityOptionService } from './amenity-option.services';
import { AmenityOptionResolver } from './amenity-option.resolver';

@Module({
  providers: [AmenityOptionService, AmenityOptionResolver],
})
export class AmenityOptionModule {}
