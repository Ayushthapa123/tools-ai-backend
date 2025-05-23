import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateGalleryInput } from './dto/create-gallery.dto';
import { UpdateGalleryInput } from './dto/update-gallery.dto';

@Injectable()
export class GalleryService {
  constructor(private readonly prismaService: PrismaService) {}
  async getGalleryByHostelId(hostelId: number) {
    const gallery = await this.prismaService.gallery.findMany({
      where: { hostelId },
    });
    return {
      data: gallery,
      error: null,
    };
  }

  async createGallery(data: CreateGalleryInput) {
    const gallery = await this.prismaService.gallery.create({
      data,
    });
    return {
      data: gallery,
      error: null,
    };
  }

  async updateGallery(galleryId: number, data: UpdateGalleryInput) {
    const gallery = await this.prismaService.gallery.update({
      where: { id: galleryId },
      data,
    });
    return {
      data: gallery,
      error: null,
    };
  }

  async deleteGallery(galleryId: number) {
    const gallery = await this.prismaService.gallery.delete({
      where: { id: galleryId },
    });
    // if deleting image is sleected, then select the first image
    const galleries = await this.prismaService.gallery.findMany({
      where: { hostelId: gallery.hostelId },
    });
    if (gallery.isSelected && galleries.length > 0) {
      await this.prismaService.gallery.updateMany({
        where: { hostelId: gallery.hostelId },
        data: { isSelected: false },
      });
      await this.prismaService.gallery.update({
        where: { id: galleries[0].id },
        data: { isSelected: true },
      });
    }
    // return the deleted image
    return {
      data: gallery,
      error: null,
    };
  }

  async selectGallery(galleryId: number, hostelId: number) {
    await this.prismaService.gallery.updateMany({
      where: { hostelId: hostelId },
      data: { isSelected: false },
    });
    const gallery = await this.prismaService.gallery.update({
      where: {
        id: galleryId,
        hostelId: hostelId,
      },
      data: {
        isSelected: true,
      },
    });
    return {
      data: gallery,
      error: null,
    };
  }
}
