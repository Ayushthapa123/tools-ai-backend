import { Module } from '@nestjs/common';

import { HostelService } from './hostel.service';
import { HostelResolver } from './hostel.resolver';
import { PrismaService } from '@src/prisma/prisma.service';
import { ContactModule } from './contact/contact.module';
import { AddressModule } from './address/address.module';
import { SocialsModule } from './socials/socials.module';
import { RoomAvailibilityModule } from './roomAvailability/roomAvalibility.module';
import { DailyPricingModule } from './dailyPricing/dailyPricing.module';
import { MonthlyPricingModule } from './monthlyPricing/monthlyPricing.module';
import { GalleryModule } from './gallery/gallery.module';
import { JwtService } from '@nestjs/jwt';
import { SettingsModule } from './settings/settings.module';
import { NearbyPlaceModule } from './nearbyPlaces/nearbyPlace.module';
import { AmenitiesModule } from './amenities/amenities.module';
import { ServicesModule } from './services/services.module';
import { HostelRulesModule } from './hostelRules/hostelRules.module';

@Module({
  imports: [
    ContactModule,
    AddressModule,
    SocialsModule,
    RoomAvailibilityModule,
    DailyPricingModule,
    MonthlyPricingModule,
    GalleryModule,
    SettingsModule,
    NearbyPlaceModule,
    AmenitiesModule,
    ServicesModule, 
    HostelRulesModule
  ],
  providers: [HostelResolver, HostelService, JwtService],
})
export class HostelModule {}
