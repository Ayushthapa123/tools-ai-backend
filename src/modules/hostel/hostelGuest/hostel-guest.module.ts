import { Module } from '@nestjs/common';
import { HostelGuestService } from './hostel-guest.service';
import { HostelGuestResolver } from './hostel-guest.resolver';
import { JwtService } from '@nestjs/jwt';
import { MailersendService } from '@src/modules/mailersend/mailersend.service';
@Module({
  imports: [],
  providers: [
    HostelGuestResolver,
    HostelGuestService,
    JwtService,
    MailersendService,
  ],
  exports: [HostelGuestService],
})
export class HostelGuestModule {}
