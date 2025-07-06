import { Module } from '@nestjs/common';
import { ServiceOptionService } from './service-option.services';
import { ServiceOptionResolver } from './service-option.resolver';
import { AuthGuard } from '@src/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
@Module({
  providers: [
    ServiceOptionService,
    ServiceOptionResolver,
    AuthGuard,
    JwtService,
  ],
})
export class ServiceOptionModule {}
