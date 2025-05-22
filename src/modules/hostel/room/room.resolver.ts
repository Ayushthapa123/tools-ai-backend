import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { RoomService } from './room.service';
import { BookingConfirmationMailData, Room } from '@src/models/global.model';
import { CreateRoomInput } from './dtos/create-room.input';
import { UpdateRoomInput } from './dtos/update-room.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@src/guards/auth.guard';

@Resolver(() => Room)
export class RoomResolver {
  constructor(private readonly roomService: RoomService) {}

  @Mutation(() => Room)
  @UseGuards(AuthGuard)
  async createRoom(
    @Args('createRoomInput') createRoomInput: CreateRoomInput,
    @Context() ctx: any,
  ) {
    if (!ctx.user?.homestayId) {
      throw new Error('User does not have a homestay associated');
    }
    const { data, error } = await this.roomService.create(
      createRoomInput,
      ctx.user.homestayId,
    );
    return { data: data, error };
  }

  @Query(() => [Room], { name: 'rooms' })
  async findAll() {
    const { data, error } = await this.roomService.findAll();
    return { data: data, error };
  }

  @Query(() => Room, { name: 'room' })
  @UseGuards(AuthGuard)
  async findOne(
    @Args('id', { type: () => Int }) id: number,
    @Context() ctx: any,
  ) {
    if (!ctx.user?.homestayId) {
      return {
        data: null,
        error: {
          message: 'User does not have a homestay associated',
        },
      };
    }
    const { data, error } = await this.roomService.findOne(
      id,
      ctx.user.homestayId,
    );
    return { data: data, error };
  }

  @Query(() => BookingConfirmationMailData)
  findRoomsByRoomIds(
    @Args('roomIds', { type: () => [Int] }) roomIds: number[],
  ) {
    return this.roomService.findRoomsByRoomIds(roomIds);
  }

  @Mutation(() => Room)
  @UseGuards(AuthGuard)
  async updateRoom(
    @Args('updateRoomInput') updateRoomInput: UpdateRoomInput,
    @Context() ctx: any,
  ) {
    if (!ctx.user?.homestayId) {
      return {
        data: null,
        error: {
          message: 'User does not have a homestay associated',
        },
      };
    }
    const { data, error } = await this.roomService.update(
      updateRoomInput,
      ctx.user.homestayId,
    );
    return { data: data, error };
  }

  @Mutation(() => Room)
  @UseGuards(AuthGuard)
  async removeRoom(
    @Args('id', { type: () => Int }) id: number,
    @Context() ctx: any,
  ): Promise<Room> {
    if (!ctx.user?.homestayId) {
      return {
        data: null,
        error: {
          message: 'User does not have a homestay associated',
        },
      };
    }
    const { data, error } = await this.roomService.remove(
      id,
      ctx.user.homestayId,
    );
    return { data: data, error };
  }

  @Query(() => Room, { name: 'roomsByHomestay' })
  @UseGuards(AuthGuard)
  async findRoomsByHomestayId(@Context() ctx: any) {
    if (!ctx.user?.homestayId) {
      return {
        data: null,
        error: {
          message: 'User does not have a homestay associated',
        },
      };
    }
    const { data, error } = await this.roomService.findRoomsByHomestayId(
      ctx.user.homestayId,
    );
    return { data: data, error };
  }
}
