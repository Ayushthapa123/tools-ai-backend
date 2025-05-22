import { Module } from '@nestjs/common';
import { WallpaperService } from './homestayImage.service';
import { WallpaperResolver } from './homestayImage.resolver';

@Module({
  providers: [WallpaperResolver, WallpaperService],
})
export class WallpaperModule {}
