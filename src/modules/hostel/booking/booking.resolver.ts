import { Args, Mutation, Query, Resolver, Context, Int } from '@nestjs/graphql';
import { BookingService } from './booking.service';
import { CreateBookingInput } from './dtos/create-booking.input';
import { UpdateBookingInput } from './dtos/update-booking.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@src/guards/auth.guard';
import { Booking, BookingList } from '@src/models/global.model';
import { ValidInvalidBooking } from './models/valid-booking.model';
import { ConfirmBooking } from './models/confirm-booking.model';
@Resolver(() => Booking)
// @UseGuards(AuthGuard)
export class BookingResolver {
  constructor(private readonly bookingService: BookingService) {}

  @Mutation(() => Booking)
  async createBooking(
    @Args('createBookingInput') createBookingInput: CreateBookingInput,
    @Context() ctx: any,
  ) {
    if (!ctx.user?.sub) {
      return {
        data: null,
        error: {
          message: 'User not authenticated',
        },
      };
    }
    return this.bookingService.create(createBookingInput, ctx.user.sub);
  }

  @Query(() => BookingList)
  async bookings() {
    const bookings = await this.bookingService.findAll();
    if (!bookings) {
      return {
        data: null,
        error: {
          message: 'No bookings found',
        },
      };
    }
    return { data: bookings, error: null };
  }
  // get booking by hostel id insteasd of pasding id get id from auth context
  @Query(() => BookingList)
  @UseGuards(AuthGuard)
  async bookingsByHostel(@Context() ctx: any) {
    if (!ctx.user?.hostelId) {
      return {
        data: null,
        error: {
          message: 'User does not have a hostel associated',
        },
      };
    }
    return this.bookingService.findBookingsByHostelId(ctx.user.hostelId);
  }

  @Query(() => Booking)
  async booking(@Args('id') id: number) {
    const booking = await this.bookingService.findOne(id);
    if (!booking) {
      return {
        data: null,
        error: {
          message: `Booking with ID ${id} not found`,
        },
      };
    }
    return { data: booking, error: null };
  }

  @Query(() => BookingList)
  async bookingsWithKey(@Args('bookingKey') bookingKey: string) {
    return this.bookingService.findBookingsWithKey(bookingKey);
  }

  @Mutation(() => Booking)
  async updateBooking(
    @Args('id') id: number,
    @Args('updateBookingInput') updateBookingInput: UpdateBookingInput,
    @Context() ctx: any,
  ) {
    if (!ctx.user?.sub) {
      return {
        data: null,
        error: {
          message: 'User not authenticated',
        },
      };
    }
    return this.bookingService.update(id, updateBookingInput, ctx.user.sub);
  }

  @Mutation(() => Booking)
  async removeBooking(@Args('id') id: number, @Context() ctx: any) {
    if (!ctx.user?.sub) {
      return {
        data: null,
        error: {
          message: 'User not authenticated',
        },
      };
    }
    return this.bookingService.remove(id, ctx.user.sub);
  }

  @Query(() => BookingList)
  @UseGuards(AuthGuard)
  async myBookings(@Context() ctx: any) {
    if (!ctx.user?.sub) {
      return {
        data: null,
        error: {
          message: 'User not authenticated',
        },
      };
    }
    return this.bookingService.findBookingsByGuestId(ctx.user.sub);
  }

  @Query(() => BookingList)
  async roomBookings(@Args('roomId') roomId: number) {
    return this.bookingService.findBookingsByRoomId(roomId);
  }

  // found that it only returns the number of bookings updated
  // so it should returning the count of bookings updated and valid to true
  @Mutation(() => ConfirmBooking)
  async confirmBooking(@Args('bookingKey') bookingKey: string) {
    const x = await this.bookingService.confirmBooking(bookingKey);
    return { count: x.data.count };
  }

  @Query(() => ValidInvalidBooking)
  async checkValidBooking(
    @Args('roomIds', { type: () => [Int] }) roomIds: number[], // it should take array of room ids
    @Args('startDate', { type: () => Date }) startDate: Date,
    @Args('endDate', { type: () => Date }) endDate: Date,
  ) {
    return this.bookingService.checkValidBooking(roomIds, startDate, endDate);
  }
}
