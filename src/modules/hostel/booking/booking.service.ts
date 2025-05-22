import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateBookingInput } from './dtos/create-booking.input';
import { UpdateBookingInput } from './dtos/update-booking.input';
import { BookingStatus } from '@prisma/client';
import { getDateDifference, isDateWeekend } from '@src/utils/date';
import { BookingSummary } from './models/valid-booking.model';
@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async create(createBookingInput: CreateBookingInput, guestId: number) {
    // booking include room and guest
    // Check if room exists
    const room = await this.prisma.room.findUnique({
      where: { id: createBookingInput.roomId },
    });

    if (!room) {
      return {
        data: null,
        error: {
          message: `Room with ID ${createBookingInput.roomId} not found`,
        },
      };
    }

    // Check if guest exists
    const guest = await this.prisma.user.findUnique({
      where: { id: guestId },
    });

    if (!guest) {
      return {
        data: null,
        error: {
          message: `Guest with ID ${guestId} not found`,
        },
      };
    }

    const booking = await this.prisma.booking.create({
      data: {
        roomId: createBookingInput.roomId,
        startDate: createBookingInput.startDate,
        endDate: createBookingInput.endDate,
        bookingKey: createBookingInput.bookingKey,
        guestId: guestId,
        status: BookingStatus.PENDING,
      },
      include: {
        room: true,
        guest: true,
      },
    });

    return {
      data: booking,
      error: null,
    };
  }

  async findAll() {
    const bookings = await this.prisma.booking.findMany({
      include: {
        room: true,
        guest: true,
      },
    });

    return {
      data: bookings,
      error: null,
    };
  }

  async findBookingsByHomestayId(homestayId: number) {
    const bookings = await this.prisma.booking.findMany({
      where: { room: { homestayId } },
      include: {
        room: { include: { price: true } },
        guest: true,
      },
    });

    return {
      data: bookings,
      error: null,
    };
  }

  async findOne(id: number) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        room: true,
        guest: true,
      },
    });

    if (!booking) {
      return {
        data: null,
        error: {
          message: `Booking with ID ${id} not found`,
        },
      };
    }

    return {
      data: booking,
      error: null,
    };
  }

  async update(
    id: number,
    updateBookingInput: UpdateBookingInput,
    guestId: number,
  ) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      return {
        data: null,
        error: {
          message: `Booking with ID ${id} not found`,
        },
      };
    }

    if (booking.guestId !== guestId) {
      return {
        data: null,
        error: {
          message: 'You do not have permission to update this booking',
        },
      };
    }

    const updatedBooking = await this.prisma.booking.update({
      where: { id },
      data: updateBookingInput,
      include: {
        room: true,
        guest: true,
      },
    });

    return {
      data: updatedBooking,
      error: null,
    };
  }

  async remove(id: number, guestId: number) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      return {
        data: null,
        error: {
          message: `Booking with ID ${id} not found`,
        },
      };
    }

    if (booking.guestId !== guestId) {
      return {
        data: null,
        error: {
          message: 'You do not have permission to delete this booking',
        },
      };
    }

    const deletedBooking = await this.prisma.booking.delete({
      where: { id },
      include: {
        room: true,
        guest: true,
      },
    });

    return {
      data: deletedBooking,
      error: null,
    };
  }

  async findBookingsByGuestId(guestId: number) {
    const bookings = await this.prisma.booking.findMany({
      where: { guestId },
      include: {
        room: true,
        guest: true,
      },
    });

    return {
      data: bookings,
      error: null,
    };
  }

  async findBookingsByRoomId(roomId: number) {
    const bookings = await this.prisma.booking.findMany({
      where: { roomId },
      include: {
        room: true,
        guest: true,
      },
    });

    return {
      data: bookings,
      error: null,
    };
  }

  async findBookingsWithKey(bookingKey: string) {
    const bookings = await this.prisma.booking.findMany({
      where: { bookingKey },
      include: {
        room: {
          include: {
            price: true,
            image: true,
          },
        },
        guest: true,
      },
    });

    if (bookings.length === 0) {
      return {
        data: null,
        error: {
          message: `Booking with key ${bookingKey} not found`,
        },
      };
    }

    return {
      data: bookings,
      error: null,
    };
  }

  async confirmBooking(bookingKey: string) {
    const bookings = await this.prisma.booking.findMany({
      where: { bookingKey },
    });
    if (bookings.length === 0) {
      return {
        data: null,
        error: {
          message: `Booking with key ${bookingKey} not found`,
        },
      };
    }
    const updatedBookings = await this.prisma.booking.updateMany({
      where: { bookingKey },
      data: { status: BookingStatus.CONFIRMED },
    });

    return {
      data: updatedBookings,
      error: null,
    };
  }

  // check if booking with same rooom startdata,enddate exists. there is two states
  // in bookings as well  idle and confirmed. if already confirmed booking found throw error.
  //  if with idle found check for createdAt if createdAt is greater then 3 min
  // if greater then 30 min return true else return false
  async checkValidBooking(roomIds: number[], startDate: Date, endDate: Date) {
    // i have to go through each room id and get bookings
    // i have to find all the pricing and dynamic pricing for that room and figure out  which one pricing to apply. by sorting the pricing priority.
    // Also need to check for weekend only and active rule or not

    const bookingSummary: BookingSummary[] = [];
    let totalPrice = 0; // we have to calculate the price by going through each room and price of that room from startDate to endDate.

    if (!Array.isArray(roomIds) || roomIds.length === 0) {
      return {
        isValid: false,
        message: 'Invalid room selection',
        bookingSummary: null,
      };
    }

    const dateDifference = getDateDifference(startDate, endDate);
    if (dateDifference < 1) {
      return {
        isValid: false,
        message: 'Booking is not valid, end date is before start date',
        bookingSummary: bookingSummary,
      };
    }
    if (dateDifference > 40) {
      return {
        isValid: false,
        message:
          'Booking is not valid, Because date difference is more then 40 days',
        bookingSummary: bookingSummary,
      };
    }

    const invalidBookingResponse = {
      isValid: false,
      message: 'Booking is not valid',
      bookingSummary: bookingSummary,
    };

    // In first step check for conflict booking if found return invalid booking response this will save calculations
    // in second step calculate price according to date and accumulate price
    for (const roomId of roomIds) {
      const room = await this.prisma.room.findUnique({
        where: { id: Number(roomId) },
        include: {
          price: true,
          dynamicPricingRule: true,
          booking: {
            where: {
              startDate: { lte: endDate },
              endDate: { gt: startDate },
              status: { in: [BookingStatus.CONFIRMED, BookingStatus.PENDING] },
            },
          },
        },
      });

      if (room?.booking?.length > 0) {
        if (room.booking.some((b) => b.status === BookingStatus.CONFIRMED)) {
          invalidBookingResponse.isValid = false;
          invalidBookingResponse.message = 'Booking is not valid';
          invalidBookingResponse.bookingSummary = null;
          return invalidBookingResponse;
        }
        if (room.booking.some((b) => b.status === BookingStatus.PENDING)) {
          const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
          if (room.booking.some((b) => b.createdAt > thirtyMinutesAgo)) {
            invalidBookingResponse.isValid = false;
            invalidBookingResponse.message =
              'Booking is not valid,its being booked by another user';
            invalidBookingResponse.bookingSummary = null;
            return invalidBookingResponse;
          }
        }
      }

      let totalPriceOfRoom = 0;
      for (let i = 0; i < dateDifference; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        const isThisDateWeekend = isDateWeekend(date);
        // log all the conditions below applied
        const price = room?.price?.isDynamicPricing
          ? (room?.dynamicPricingRule
              .sort((a, b) => b.priority - a.priority)
              .find((r) => {
                return (
                  r.startDate <= date &&
                  r.endDate >= date &&
                  r.isActive &&
                  r.isWeekend === isThisDateWeekend
                );
              })?.amount ?? room?.price?.baseAmount)
          : (room?.price?.baseAmount ?? 0);
        totalPrice += price;
        totalPriceOfRoom += price;
      }
      bookingSummary.push({
        roomId,
        price: room?.price?.baseAmount,
        totalPriceOfRoom,
        priceType: room?.price?.isDynamicPricing
          ? 'Dynamic Pricing'
          : 'Base Pricing',
      });
    }

    // After the loop is fully completed

    return {
      isValid: true,
      message: 'Booking is valid',
      bookingSummary: bookingSummary,
      totalPrice: totalPrice,
      totalDays: dateDifference,
    };
  }
}
