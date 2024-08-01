import { Module } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { NearbyPlaceService } from './nearbyPlace.service';
import { NearbyPlaceResolver } from './nearbyPlace.resolver';

@Module({
  providers: [NearbyPlaceService, NearbyPlaceResolver, JwtService],
})
export class NearbyPlaceModule {}
