import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateHomestayWallpaperInput } from './dto/create-homestay-wallpaper.dto';
import { UpdateHomestayWallpaperInput } from './dto/update-homestay-wallpaper.dto';

@Injectable()
export class WallpaperService {
  constructor(private readonly prismaService: PrismaService) {}
  async getHomestayWallpaperByHomestayId(homestayId: number) {
    const homestayImage = await this.prismaService.homestayImage.findMany({
      where: { homestayId },
    });
    return {
      data: homestayImage,
      error: null,
    };
  }

  async createRoomImage(data: CreateHomestayWallpaperInput) {
    const homestayImage = await this.prismaService.homestayImage.create({
      data,
    });
    return {
      data: [homestayImage],
      error: null,
    };
  }

  async updateRoomImage(
    homestayImageId: number,
    data: UpdateHomestayWallpaperInput,
  ) {
    const homestayImage = await this.prismaService.homestayImage.update({
      where: { id: homestayImageId },
      data,
    });
    return {
      data: [homestayImage],
      error: null,
    };
  }

  async deleteRoomImage(homestayImageId: number) {
    const homestayImage = await this.prismaService.homestayImage.delete({
      where: { id: homestayImageId },
    });
    // if deleting image is sleected, then select the first image
    const homestayImages = await this.prismaService.homestayImage.findMany({
      where: { homestayId: homestayImage.homestayId },
    });
    if (homestayImage.isSelected && homestayImages.length > 0) {
      await this.prismaService.homestayImage.updateMany({
        where: { homestayId: homestayImage.homestayId },
        data: { isSelected: false },
      });
      await this.prismaService.homestayImage.update({
        where: { id: homestayImages[0].id },
        data: { isSelected: true },
      });
    }
    // return the deleted image
    return {
      data: [homestayImage],
      error: null,
    };
  }

  async selectHomestayImage(selectHomestayImageId: number, homestayId: number) {
    await this.prismaService.homestayImage.updateMany({
      where: { homestayId: homestayId },
      data: { isSelected: false },
    });
    const homestayImage = await this.prismaService.homestayImage.update({
      where: {
        id: selectHomestayImageId,
        homestayId: homestayId,
      },
      data: {
        isSelected: true,
      },
    });
    return {
      data: [homestayImage],
      error: null,
    };
  }
}
