import { Injectable, NotFoundException } from '@nestjs/common';
import { RoomAmenity } from '@src/models/global.model';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateRoomAmenityInput } from './dto/create-amenity.dto';
import { UpdateRoomAmenityInput } from './dto/update-amenity.dto';

@Injectable()
export class RoomAmenityService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<RoomAmenity[]> {
    const amenities = await this.prisma.roomAmenity.findMany({
      include: { room: true },
    });

    return amenities.map((amenity) => ({
      data: amenity,
      error: null,
    }));
  }

  async findOne(id: number): Promise<RoomAmenity> {
    const amenity = await this.prisma.roomAmenity.findUnique({
      where: { id: id },
      include: { room: true },
    });

    if (!amenity) {
      throw new NotFoundException(`Amenity with ID ${id} not found`);
    }

    return {
      data: amenity,
      error: null,
    };
  }

  async findByRoomId(roomId: number): Promise<RoomAmenity> {
    const amenity = await this.prisma.roomAmenity.findFirst({
      where: { roomId: roomId },
      include: { room: true },
    });

    return {
      data: amenity,
      error: null,
    };
  }

  async create(
    createAmenityInput: CreateRoomAmenityInput,
  ): Promise<RoomAmenity> {
    // Verify that the Hostel exists
    const room = await this.prisma.room.findFirst({
      where: { id: createAmenityInput.roomId },
    });

    if (!room) {
      throw new NotFoundException(
        `Room with ID ${createAmenityInput.roomId} not found`,
      );
    }

    const amenity = await this.prisma.roomAmenity.create({
      data: createAmenityInput,
    });

    return {
      data: amenity,
      error: null,
    };
  }

  async update(
    updateAmenityInput: UpdateRoomAmenityInput,
  ): Promise<RoomAmenity> {
    // Verify that the amenity exists
    await this.findOne(updateAmenityInput.id);

    // If hostelId is being updated, verify that the hostel exists
    if (updateAmenityInput.roomId) {
      const room = await this.prisma.room.findUnique({
        where: { id: updateAmenityInput.roomId },
      });

      if (!room) {
        throw new NotFoundException(
          `Hostel with ID ${updateAmenityInput.roomId} not found`,
        );
      }
    }

    const amenity = await this.prisma.roomAmenity.update({
      where: { id: updateAmenityInput.id },
      data: {
        amenity: updateAmenityInput.amenity,
      },
      include: { room: true },
    });

    return {
      data: amenity,
      error: null,
    };
  }

  async remove(roomAmenityId: number): Promise<RoomAmenity> {
    // Verify that the amenity exists
    await this.findOne(roomAmenityId);

    const amenity = await this.prisma.roomAmenity.delete({
      where: { id: roomAmenityId },
      include: { room: true },
    });

    return {
      data: amenity,
      error: null,
    };
  }
}
