import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomResolver } from './room.resolver';
import { JwtService } from '@nestjs/jwt';
import { PriceModule } from './price/price.module';
import { RoomImageModule } from './room-image/room-image.module';
import { AmenityModule } from '../amenity/amenity.module';
import { DynamicPriceRuleModule } from './dynamic-price-rule/dynamic-price-rule.module';
import { RoomAmenityModule } from './room-amenity/room-amenity.module';
@Module({
  imports: [
    PriceModule,
    RoomImageModule,
    AmenityModule,
    DynamicPriceRuleModule,
    RoomAmenityModule,
  ],
  providers: [RoomResolver, RoomService, JwtService],
  exports: [RoomService],
})
export class RoomModule {}
