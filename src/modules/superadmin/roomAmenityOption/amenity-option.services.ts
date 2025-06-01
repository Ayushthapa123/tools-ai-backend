import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateRoomAmenityOptionInput } from './dtos/create-amenity-option.input';
import { UpdateRoomAmenityOptionInput } from './dtos/update-amenity-option.input';

@Injectable()
export class RoomAmenityOptionService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    const res = await this.prisma.roomAmenityOption.findMany({
      take: 100,
    });
    return {
      data: res,
      error: null,
    };
  }

  async getAmenityOptionById(amenityOptionId: number) {
    const res = await this.prisma.roomAmenityOption.findUnique({
      where: { id: amenityOptionId },
    });
    return {
      data: res,
      error: null,
    };
  }

  async create(data: CreateRoomAmenityOptionInput) {
    const roomAmenityOption = await this.prisma.roomAmenityOption.findFirst({
      where: { name: data.name },
    });
    if (!roomAmenityOption) {
      const res = await this.prisma.roomAmenityOption.create({
        data,
      });
      return {
        data: res,
        error: null,
      };
    } else {
      return {
        data: null,
        error: {
          message: 'Room amenity option already exists',
        },
      };
    }
  }

  async update(id: number, data: UpdateRoomAmenityOptionInput) {
    const roomAmenity = await this.prisma.roomAmenityOption.findFirst({
      where: { id: id },
    });

    if (roomAmenity) {
      const res = await this.prisma.roomAmenityOption.update({
        where: { id: id },
        data,
      });
      return {
        data: res,
        error: null,
      };
    } else {
      return {
        data: null,
        error: {
          message: 'Room amenity option already exists',
        },
      };
    }
  }

  async delete(id: number) {
    const res = await this.prisma.roomAmenityOption.delete({
      where: { id: id },
    });
    return {
      data: res,
      error: null,
    };
  }
}
