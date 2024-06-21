import { Module } from '@nestjs/common';

import { GalleryService } from './gallery.service';
import { GalleryResolver } from './gallery.resolver';

@Module({
  providers: [GalleryResolver, GalleryService],
})
export class GalleryModule {}
