import { Module } from '@nestjs/common';

import { RoomAvailibilityService } from './roomAvailibility.service';
import { RoomAvailibilityResolver } from './roomAvailibility.resolver';

@Module({
  providers: [RoomAvailibilityResolver, RoomAvailibilityService],
})
export class RoomAvailibilityModule {}
