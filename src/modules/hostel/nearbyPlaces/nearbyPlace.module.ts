import { Module } from '@nestjs/common';

import { NearbyPlaceService } from './nearbyPlace.service';
import { NearbyPlaceResolver } from './nearbyPlace.resolver';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [NearbyPlaceService, NearbyPlaceResolver,JwtService],
})
export class NearbyPlaceModule {}
