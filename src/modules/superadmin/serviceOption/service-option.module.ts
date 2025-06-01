import { Module } from '@nestjs/common';
import { ServiceOptionService } from './service-option.services';
import { ServiceOptionResolver } from './service-option.resolver';

@Module({
  providers: [ServiceOptionService, ServiceOptionResolver],
})
export class ServiceOptionModule {}
