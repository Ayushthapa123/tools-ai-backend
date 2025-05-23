import { Resolver, Query, Args, Mutation, Context, Int } from '@nestjs/graphql';
import { RoomImageService } from './room-image.service';
import { RoomImage, RoomImageList } from '@src/models/global.model';
import { CreateRoomImageInput } from './dtos/create-room-image.input';
import { UpdateRoomImageInput } from './dtos/update-room-image.input';
import { AuthGuard } from '@src/guards/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => RoomImage)
export class RoomImageResolver {
  constructor(private readonly roomImageService: RoomImageService) {}

  @Query(() => RoomImageList, { nullable: true })
  @UseGuards(AuthGuard)
  async getRoomImagesByRoomId(
    @Args('roomId', { type: () => Int }) roomId: number,
    @Context() ctx: any,
  ): Promise<RoomImageList> {
    const { data, error } = await this.roomImageService.getRoomImagesByRoomId(
      roomId,
      ctx.user.hostelId,
    );
    return { data: data, error };
  }

  @Mutation(() => RoomImage)
  async createRoomImage(
    @Args('data') data: CreateRoomImageInput,
  ): Promise<RoomImage> {
    const { data: roomImage, error } =
      await this.roomImageService.createRoomImage(data);
    return { data: roomImage, error };
  }

  @Mutation(() => RoomImage)
  async deleteRoomImage(
    @Args('roomImageId', { type: () => Int }) roomImageId: number,
  ): Promise<RoomImage> {
    const { data, error } =
      await this.roomImageService.deleteRoomImage(roomImageId);
    return { data: data, error };
  }

  @Mutation(() => RoomImage)
  async updateRoomImage(
    @Args('roomImageId', { type: () => Int }) roomImageId: number,
    @Args('data') data: UpdateRoomImageInput,
  ): Promise<RoomImage> {
    const { data: roomImage, error } =
      await this.roomImageService.updateRoomImage(roomImageId, data);
    return { data: roomImage, error };
  }
}
