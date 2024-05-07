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

@Module({
  imports: [
    ContactModule,
    AddressModule,
    SocialsModule,
    RoomAvailibilityModule,
    DailyPricingModule,
    MonthlyPricingModule,
    GalleryModule,
  ],
  providers: [HostelResolver, HostelService, PrismaService, JwtService],
})
export class HostelModule {}
