import { Module } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { HostelService } from './hostel.service';
import { HostelResolver } from './hostel.resolver';
import { ContactModule } from './contact/contact.module';
import { AddressModule } from './address/address.module';
import { SocialsModule } from './socials/socials.module';
import { GalleryModule } from './gallery/gallery.module';
import { SettingsModule } from './settings/settings.module';
import { ServicesModule } from './services/services.module';
import { AmenitiesModule } from './amenities/amenities.module';
import { HostelRulesModule } from './hostelRules/hostelRules.module';
import { NearbyPlaceModule } from './nearbyPlaces/nearbyPlace.module';
import { DailyPricingModule } from './dailyPricing/dailyPricing.module';
import { MonthlyPricingModule } from './monthlyPricing/monthlyPricing.module';
import { RoomAvailibilityModule } from './roomAvailability/roomAvalibility.module';
import { GoogleMapLocationModule } from './googleMapLocation/googleMapLocation.module';
// import { FoodMenuModule } from './food-menu/food-menu.module';

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
    HostelRulesModule,
    GoogleMapLocationModule,
    // FoodMenuModule,
  ],
  providers: [HostelResolver, HostelService, JwtService],
})
export class HostelModule {}
