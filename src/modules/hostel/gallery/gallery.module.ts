import { Module } from '@nestjs/common';

import { GalleryService } from './gallery.service';
import { GalleryResolver } from './gallery.resolver';
import { PrismaService } from '@src/prisma/prisma.service';

@Module({
  providers: [GalleryResolver, GalleryService, PrismaService],
})
export class GalleryModule {}
