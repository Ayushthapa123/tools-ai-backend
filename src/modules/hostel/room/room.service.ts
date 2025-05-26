import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateRoomInput } from './dtos/create-room.input';
import { UpdateRoomInput } from './dtos/update-room.input';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  async create(createRoomInput: CreateRoomInput, hostelId: number) {
    const {
      status,
      capacity,
      attachBathroom,
      caption,
      roomNumber,
      maxOccupancy,
      description,
    } = createRoomInput;

    // Check if hostel exists
    const hostel = await this.prisma.hostel.findUnique({
      where: { id: hostelId },
    });

    if (!hostel) {
      return {
        data: null,
        error: {
          message: `Hostel with ID ${hostelId} not found`,
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
        hostelId,
        maxOccupancy,
        description,
      },
    });

    return {
      data: room,
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

  async findOne(id: number, hostelId: number) {
    const room = await this.prisma.room.findUnique({
      where: { id, hostelId },
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
      data: room,
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
        hostel: true,
      },
    });
    const roomNumbers = rooms.map((room) => room.roomNumber);
    const hostelName = rooms[0].hostel.name;
    return { roomNumbers, name: hostelName };
  }

  async update(updateRoomInput: UpdateRoomInput, hostelId: number) {
    const { id, ...rest } = updateRoomInput;
    const dataToUpdate = Object.fromEntries(
      Object.entries(rest).filter(
        ([key]) => !['hostelId', 'price'].includes(key),
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

    if (room.hostelId !== hostelId) {
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
      data: updatedRoom,
      error: null,
    };
  }

  async remove(id: number, hostelId: number) {
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

      if (room.hostelId !== hostelId) {
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
        data: deletedRoom,
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

  async findRoomsByHostelId(hostelId: number) {
    const rooms = await this.prisma.room.findMany({
      where: { hostelId },
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
