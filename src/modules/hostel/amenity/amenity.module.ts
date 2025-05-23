import { Module } from '@nestjs/common';
import { AmenityService } from './amenity.service';
import { AmenityResolver } from './amenity.resolver';

@Module({
  providers: [AmenityResolver, AmenityService],
})
export class AmenityModule {}
