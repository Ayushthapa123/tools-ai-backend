import { Gallery } from '../../../models/global.model';
import { UpdateGalleryInput } from './dtos/update-gallery.input';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateGalleryInput } from './dtos/create-gallery.input';
import { GalleryType } from '@prisma/client';

@Injectable()
export class GalleryService {
  constructor(private readonly prisma: PrismaService) {}

  async getGAllerysByHostelId(
    hostelId: number,
    galleryType: GalleryType,
  ): Promise<Gallery[] | null> {
    return this.prisma.gallery.findMany({
      where: { hostelId, type: galleryType },
      take: 5,
    });
  }

  async createGallery(data: CreateGalleryInput) {
    return this.prisma.gallery.create({ data });
  }

  async updateGallery(galleryId: number, data: UpdateGalleryInput) {
    return this.prisma.gallery.update({ where: { galleryId }, data });
  }

  async deleteGallery(galleryId: number) {
    return this.prisma.gallery.delete({ where: { galleryId } });
  }
}
