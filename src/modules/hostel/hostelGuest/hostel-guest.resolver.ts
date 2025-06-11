import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { HostelGuestService } from './hostel-guest.service';
import {
  BookingConfirmationMailData,
  HostelGuest,
  HostelGuestList,
} from '@src/models/global.model';
import { CreateHostelGuestInput } from './dtos/create-hostel-guest.input';
import { UpdateHostelGuestInput } from './dtos/update-hostel-guest.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@src/guards/auth.guard';

@Resolver(() => HostelGuest)
export class HostelGuestResolver {
  constructor(private readonly hostelGuestService: HostelGuestService) {}

  @Mutation(() => HostelGuest)
  @UseGuards(AuthGuard)
  async createHostelGuest(
    @Args('createHostelGuestInput')
    createHostelGuestInput: CreateHostelGuestInput,
    @Args('withWelcomeEmail', { type: () => Boolean })
    withWelcomeEmail: boolean,

    @Args('allowEdit', { type: () => Boolean })
    allowEdit: boolean,

    @Context() ctx: any,
  ) {
    if (!ctx.user?.hostelId) {
      return {
        data: null,
        error: {
          message: 'User does not have a hostel associated',
        },
      };
    }
    const { data, error } = await this.hostelGuestService.create(
      createHostelGuestInput,
      ctx.user.hostelId,
      withWelcomeEmail,
      allowEdit,
    );
    return { data: data, error };
  }

  @Query(() => HostelGuestList, { name: 'hostelGuestsByHostelId' })
  @UseGuards(AuthGuard)
  async hostelGuestsByHostelId(@Context() ctx: any) {
    if (!ctx.user?.hostelId) {
      return {
        data: null,
        error: {
          message: 'User does not have a hostel associated',
        },
      };
    }
    return await this.hostelGuestService.findHostelGuestsByHostelId(
      ctx.user.hostelId,
    );
  }

  @Query(() => HostelGuest, { name: 'hostelGuest' })
  @UseGuards(AuthGuard)
  async findOne(
    @Args('id', { type: () => Int }) id: number,
    @Context() ctx: any,
  ) {
    if (!ctx.user?.hostelId) {
      return {
        data: null,
        error: {
          message: 'User does not have a hostel associated',
        },
      };
    }
    const { data, error } = await this.hostelGuestService.findOne(
      id,
      ctx.user.hostelId,
    );
    return { data: data, error };
  }

  @Query(() => BookingConfirmationMailData)
  findHostelGuestsByHostelRoomId(
    @Args('hostelRoomId', { type: () => Int }) hostelRoomId: number,
  ) {
    return this.hostelGuestService.findHostelGuestsByHostelRoomId(hostelRoomId);
  }

  @Mutation(() => HostelGuest)
  @UseGuards(AuthGuard)
  async updateHostelGuest(
    @Args('updateHostelGuestInput')
    updateHostelGuestInput: UpdateHostelGuestInput,
    @Context() ctx: any,
  ) {
    if (!ctx.user?.hostelId) {
      return {
        data: null,
        error: {
          message: 'User does not have a hostel associated',
        },
      };
    }
    const { data, error } = await this.hostelGuestService.update(
      updateHostelGuestInput,
      ctx.user.hostelId,
    );
    return { data: data, error };
  }

  @Mutation(() => HostelGuest)
  @UseGuards(AuthGuard)
  async removeHostelGuest(
    @Args('id', { type: () => Int }) id: number,
    @Context() ctx: any,
  ): Promise<HostelGuest> {
    if (!ctx.user?.hostelId) {
      return {
        data: null,
        error: {
          message: 'User does not have a hostel associated',
        },
      };
    }
    const { data, error } = await this.hostelGuestService.remove(
      id,
      ctx.user.hostelId,
    );
    return { data: data, error };
  }

  @Query(() => HostelGuestList, { name: 'hostelGuestsByHostelId' })
  @UseGuards(AuthGuard)
  async findHostelGuestsByHostelId(@Context() ctx: any) {
    if (!ctx.user?.hostelId) {
      return {
        data: null,
        error: {
          message: 'User does not have a hostel associated',
        },
      };
    }
    const { data, error } =
      await this.hostelGuestService.findHostelGuestsByHostelId(
        ctx.user.hostelId,
      );
    return { data: data, error };
  }

  // for guest details by token while filling the Guest Form
  @Query(() => HostelGuest, { name: 'hostelGuestByToken' })
  async findHostelGuestByToken(
    @Args('token', { type: () => String }) token: string,
  ) {
    return this.hostelGuestService.guestsDetailsByToken(token);
  }
}
