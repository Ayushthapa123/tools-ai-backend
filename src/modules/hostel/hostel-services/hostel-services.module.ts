import { Module } from '@nestjs/common';
import { HostelServicesService } from './hostel-services.service';
import { HostelServicesResolver } from './hostel-services.resolver';

@Module({
  providers: [HostelServicesResolver, HostelServicesService],
})
export class HostelServicesModule {}
