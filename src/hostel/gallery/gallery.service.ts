import { Gallery } from '../../models/global.model';
import { UpdateGalleryInput } from './dtos/update-gallery.input';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateGalleryInput } from './dtos/create-gallery.input';

@Injectable()
export class GalleryService {
  constructor(private readonly prisma: PrismaService) {}

  async getGAllerysByHostelId(hostelId: number): Promise<Gallery[] | null> {
    return this.prisma.gallery.findMany({
      where: { hostelId },
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
