import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreatePriceInput } from './dtos/create-price.input';
import { UpdatePriceInput } from './dtos/update-price.input';

@Injectable()
export class PriceService {
  constructor(private prisma: PrismaService) {}

  async create(createPriceInput: CreatePriceInput, hostelId: number) {
    const {
      baseAmountPerDay,
      baseAmountPerMonth,
      currency,
      roomId,
      isDynamicPricing,
      // dynamicAmount,
      // dynamicPriceStart,
      // dynamicPriceEnd,
      // isWeekend,
      discountAmount,
      discountType,
      isDiscountActive,
    } = createPriceInput;

    // Check if room exists and belongs to the hostel
    const room = await this.prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      return {
        data: null,
        error: {
          message: `Room with ID ${roomId} not found`,
        },
      };
    }

    if (room.hostelId !== hostelId) {
      return {
        data: null,
        error: {
          message: 'You do not have permission to create price for this room',
        },
      };
    }

    const createPrice = await this.prisma.price.create({
      data: {
        baseAmountPerDay,
        baseAmountPerMonth,
        currency,
        roomId,
        isDynamicPricing,
        // dynamicAmount,
        // dynamicPriceStart,
        // dynamicPriceEnd,
        // isWeekend,
        discountAmount,
        discountType,
        isDiscountActive,
      },
    });

    return { data: createPrice, error: null };
  }

  async findAll() {
    return {
      data: await this.prisma.price.findMany(),
      error: null,
    };
  }

  async findOne(id: number) {
    const price = await this.prisma.price.findUnique({
      where: { id },
    });

    if (!price) {
      return {
        data: null,
        error: {
          message: `Price with ID ${id} not found`,
        },
      };
    }

    return { data: price, error: null };
  }

  async update(updatePriceInput: UpdatePriceInput, hostelId: number) {
    const { id, ...rest } = updatePriceInput;

    const price = await this.prisma.price.findUnique({
      where: { id },
      include: {
        room: true,
      },
    });

    if (!price) {
      return {
        error: {
          message: `Price with ID ${id} not found`,
        },
        data: null,
      };
    }

    if (price.room.hostelId !== hostelId) {
      return {
        error: {
          message: 'You do not have permission to update this price',
        },
        data: null,
      };
    }

    const updatedPrice = await this.prisma.price.update({
      where: { id },
      data: rest,
    });
    return { data: updatedPrice, error: null };
  }

  async remove(id: number, hostelId: number) {
    const price = await this.prisma.price.findUnique({
      where: { id },
      include: {
        room: true,
      },
    });

    if (!price) {
      return {
        error: {
          message: `Price with ID ${id} not found`,
        },
        data: null,
      };
    }

    if (price.room.hostelId !== hostelId) {
      return {
        error: {
          message: 'You do not have permission to delete this price',
        },
        data: null,
      };
    }

    const removePrice = await this.prisma.price.delete({
      where: { id },
    });

    return { data: removePrice, error: null };
  }

  async findPriceByRoomId(roomId: number) {
    const price = await this.prisma.price.findUnique({
      where: { roomId },
    });

    if (!price) {
      return {
        data: null,
        error: {
          message: `Price for room with ID ${roomId} not found`,
        },
      };
    }

    return { data: price, error: null };
  }
}
