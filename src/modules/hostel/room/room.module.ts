import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomResolver } from './room.resolver';
import { JwtService } from '@nestjs/jwt';
import { PriceModule } from './price/price.module';
import { RoomImageModule } from './room-image/room-image.module';

@Module({
  imports: [PriceModule, RoomImageModule],
  providers: [RoomResolver, RoomService, JwtService],
  exports: [RoomService],
})
export class RoomModule {}
