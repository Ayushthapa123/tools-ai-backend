import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ServicesService } from './services.service';
import { ServicesResolver } from './services.resolver';

@Module({
  providers: [ServicesService, ServicesResolver, JwtService],
})
export class ServicesModule {}
