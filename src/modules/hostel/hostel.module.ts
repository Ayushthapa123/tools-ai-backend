import { Module } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { HostelService } from './hostel.service';
import { HostelResolver } from './hostel.resolver';
import { ContactModule } from './contact/contact.module';
import { AddressModule } from './address/address.module';
import { AmenityModule } from './amenity/amenity.module';
import { GalleryModule } from './gallery/gallery.module';
import { ServicesModule } from './services/services.module';
import { RoomModule } from './room/room.module';
import { HostelRulesModule } from './rules/hostelRules.module';
import { BookingModule } from './booking/booking.module';
import { SettingsModule } from './settings/settings.module';
import { HostelGuestModule } from './hostelGuest/hostel-guest.module';
@Module({
  imports: [
    ContactModule,
    AddressModule,
    RoomModule,
    GalleryModule,
    ServicesModule,
    AmenityModule,
    HostelRulesModule,
    BookingModule,
    SettingsModule,
    HostelGuestModule,
  ],
  providers: [HostelResolver, HostelService, JwtService],
})
export class HostelModule {}
