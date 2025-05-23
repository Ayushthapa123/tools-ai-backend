import { Module } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { BookingResolver } from './booking.resolver';
import { BookingService } from './booking.service';

@Module({
  providers: [BookingResolver, BookingService, JwtService],
})
export class BookingModule {}
