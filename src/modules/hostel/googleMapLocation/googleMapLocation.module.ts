import { Module } from '@nestjs/common';

import { GoogleMapLocationService } from './googleMapLocation.services';
import { GoogleMapLocationResolver } from './googleMapLocation.resolver';

@Module({
  providers: [GoogleMapLocationResolver, GoogleMapLocationService],
})
export class GoogleMapLocationModule {}
