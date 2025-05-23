import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateRoomImageInput } from './dtos/create-room-image.input';
import { UpdateRoomImageInput } from './dtos/update-room-image.input';

@Injectable()
export class RoomImageService {
  constructor(private readonly prisma: PrismaService) {}

  async getRoomImagesByRoomId(roomId: number, hostelId: number) {
    const roomImages = await this.prisma.roomImage.findMany({
      where: { roomId, room: { hostelId } },
      take: 5,
    });
    return {
      data: roomImages,
      error: null,
    };
  }

  async createRoomImage(data: CreateRoomImageInput) {
    const roomImage = await this.prisma.roomImage.create({ data });
    return {
      data: roomImage,
      error: null,
    };
  }

  async updateRoomImage(roomImageId: number, data: UpdateRoomImageInput) {
    const roomImage = await this.prisma.roomImage.update({
      where: { id: roomImageId },
      data,
    });
    return {
      data: roomImage,
      error: null,
    };
  }
  async deleteRoomImage(roomImageId: number) {
    const roomImage = await this.prisma.roomImage.delete({
      where: { id: roomImageId },
    });
    return {
      data: roomImage,
      error: null,
    };
  }
}
