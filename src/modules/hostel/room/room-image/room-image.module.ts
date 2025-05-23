import { Module } from '@nestjs/common';
import { RoomImageResolver } from './room-image.resolver';
import { RoomImageService } from './room-image.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [RoomImageResolver, RoomImageService, JwtService],
  exports: [RoomImageService],
})
export class RoomImageModule {}
