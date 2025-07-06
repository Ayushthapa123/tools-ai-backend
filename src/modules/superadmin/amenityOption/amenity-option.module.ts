import { Module } from '@nestjs/common';
import { AmenityOptionService } from './amenity-option.services';
import { AmenityOptionResolver } from './amenity-option.resolver';
import { AuthGuard } from '@src/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
@Module({
  providers: [
    AmenityOptionService,
    AmenityOptionResolver,
    AuthGuard,
    JwtService,
  ],
})
export class AmenityOptionModule {}
