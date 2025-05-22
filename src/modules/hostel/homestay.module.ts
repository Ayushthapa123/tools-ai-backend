import { Module } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { HomestayService } from './homestay.service';
import { HomestayResolver } from './homestay.resolver';
import { ContactModule } from './contact/contact.module';
import { AddressModule } from './address/address.module';
import { RoomModule } from './room/room.module';
import { BookingModule } from './booking/booking.module';

import { HomestayRulesModule } from './rules/homestayRules.module';
import { WallpaperModule } from './homestay-image/homestayImage.module';
import { ServicesModule } from './services/services.module';
@Module({
  imports: [
    ContactModule,
    AddressModule,
    RoomModule,
    BookingModule,
    HomestayRulesModule,
    WallpaperModule,
    ServicesModule,
  ],
  providers: [HomestayResolver, HomestayService, JwtService],
})
export class HomestayModule {}
