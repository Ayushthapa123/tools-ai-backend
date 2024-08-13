import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AmenitiesService } from './amenities.service';
import { AmenitiesResolver } from './amenities.resolver';

@Module({
  providers: [AmenitiesService, AmenitiesResolver, JwtService],
})
export class AmenitiesModule {}
