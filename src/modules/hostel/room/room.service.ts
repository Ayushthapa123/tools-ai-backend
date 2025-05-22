import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateRoomInput } from './dtos/create-room.input';
import { UpdateRoomInput } from './dtos/update-room.input';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  async create(createRoomInput: CreateRoomInput, homestayId: number) {
    const {
      status,
      capacity,
      attachBathroom,
      caption,
      roomNumber,
      maxOccupancy,
    } = createRoomInput;

    // Check if homestay exists
    const homestay = await this.prisma.homestay.findUnique({
      where: { id: homestayId },
    });

    if (!homestay) {
      return {
        data: null,
        error: {
          message: `Homestay with ID ${homestayId} not found`,
        },
      };
    }

    const room = await this.prisma.room.create({
      data: {
        status,
        capacity,
        attachBathroom,
        caption,
        roomNumber,
        homestayId,
        maxOccupancy,
      },
      include: {
        image: true,
        booking: true,
      },
    });

    return {
      data: [room],
      error: null,
    };
  }

  async findAll() {
    const rooms = await this.prisma.room.findMany({
      include: {
        image: true,
        booking: true,
      },
    });

    return {
      data: rooms,
      error: null,
    };
  }

  async findOne(id: number, homestayId: number) {
    const room = await this.prisma.room.findUnique({
      where: { id, homestayId },
      include: {
        image: true,
        price: true,
      },
    });

    if (!room) {
      return {
        data: null,
        error: {
          message: `Room with ID ${id} not found`,
        },
      };
    }

    return {
      data: [room],
      error: null,
    };
  }

  async findRoomsByRoomIds(roomIds: number[]) {
    const rooms = await this.prisma.room.findMany({
      where: {
        id: {
          in: roomIds,
        },
      },
      include: {
        homestay: true,
      },
    });
    const roomNumbers = rooms.map((room) => room.roomNumber);
    const homestayName = rooms[0].homestay.name;
    return { roomNumbers, name: homestayName };
  }

  async update(updateRoomInput: UpdateRoomInput, homestayId: number) {
    const { id, ...rest } = updateRoomInput;
    const dataToUpdate = Object.fromEntries(
      Object.entries(rest).filter(
        ([key]) => !['homestayId', 'price'].includes(key),
      ),
    );

    const room = await this.prisma.room.findUnique({
      where: { id },
    });

    if (!room) {
      return {
        data: null,
        error: {
          message: `Room with ID ${id} not found`,
        },
      };
    }

    if (room.homestayId !== homestayId) {
      return {
        data: null,
        error: {
          message: 'You do not have permission to update this room',
        },
      };
    }

    const updatedRoom = await this.prisma.room.update({
      where: { id },
      data: dataToUpdate,
      include: {
        image: true,
        booking: true,
      },
    });

    return {
      data: [updatedRoom],
      error: null,
    };
  }

  async remove(id: number, homestayId: number) {
    try {
      const room = await this.prisma.room.findUnique({
        where: { id },
      });

      if (!room) {
        return {
          data: null,
          error: {
            message: `Room with ID ${id} not found`,
          },
        };
      }

      if (room.homestayId !== homestayId) {
        return {
          data: null,
          error: {
            message: 'You do not have permission to delete this room',
          },
        };
      }

      const deletedRoom = await this.prisma.room.delete({
        where: { id },
      });

      return {
        data: [deletedRoom],
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: {
          message: 'not allowed',
        },
      };
    }
  }

  async findRoomsByHomestayId(homestayId: number) {
    const rooms = await this.prisma.room.findMany({
      where: { homestayId },
      include: {
        image: true,
        booking: true,
        price: true,
      },
    });

    return {
      data: rooms,
      error: null,
    };
  }
}
