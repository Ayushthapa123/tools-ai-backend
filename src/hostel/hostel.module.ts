import { Module } from '@nestjs/common';

import { HostelService } from './hostel.service';
import { HostelResolver } from './hostel.resolver';
import { PrismaService } from '@src/prisma/prisma.service';
import { ContactModule } from './contact/contact.module';
import { AddressModule } from './address/address.module';
import { SocialsModule } from './socials/socials.module';
import { RoomAvailibilityModule } from './roomAvailability/roomAvalibility.module';

@Module({
  imports: [
    ContactModule,
    AddressModule,
    SocialsModule,
    RoomAvailibilityModule,
  ],
  providers: [HostelResolver, HostelService, PrismaService],
})
export class HostelModule {}
