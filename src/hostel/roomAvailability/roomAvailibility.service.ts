import { RoomAvailability } from '../../models/global.model';
import { UpdateRoomAvailibilityInput } from './dtos/update-room-availibility.input';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateRoomAvailibilityInput } from './dtos/create-room-availibility.input';

@Injectable()
export class RoomAvailibilityService {
  constructor(private readonly prisma: PrismaService) {}

  async getRoomAvailibilityByHostelId(
    hostelId: number,
  ): Promise<RoomAvailability | null> {
    return this.prisma.roomAvailability.findUnique({
      where: { hostelId },
    });
  }

  async createRoomAvailibility(data: CreateRoomAvailibilityInput) {
    return this.prisma.roomAvailability.create({ data });
  }

  async updateRoomAvailibility(
    roomAvailabilityId: number,
    data: UpdateRoomAvailibilityInput,
  ) {
    return this.prisma.roomAvailability.update({
      where: { roomAvailabilityId },
      data,
    });
  }

  async deleteAddress(roomAvailabilityId: number) {
    return this.prisma.roomAvailability.delete({
      where: { roomAvailabilityId },
    });
  }
}
