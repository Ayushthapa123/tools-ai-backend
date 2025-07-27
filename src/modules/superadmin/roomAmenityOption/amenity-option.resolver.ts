import {
  RoomAmenityOption,
  RoomAmenityOptionList,
  CtxType,
} from '@src/models/global.model';
import { RoomAmenityOptionService } from './amenity-option.services';
import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { CreateRoomAmenityOptionInput } from './dtos/create-amenity-option.input';
import { UpdateRoomAmenityOptionInput } from './dtos/update-amenity-option.input';
import { AuthGuard } from '@src/guards/auth.guard';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { UserType } from '@prisma/client';

@UseGuards(AuthGuard)
@Resolver(() => RoomAmenityOption)
export class RoomAmenityOptionResolver {
  constructor(
    private readonly roomAmenityOptionService: RoomAmenityOptionService,
  ) {}

  @Query(() => RoomAmenityOption, { name: 'roomAmenityOptionById' })
  async getAmenityOptionById(@Args('id', { type: () => Int }) id: number) {
    return this.roomAmenityOptionService.getAmenityOptionById(id);
  }

  @Query(() => RoomAmenityOptionList, { name: 'roomAmenityOptions' })
  async roomAmenityOptions() {
    return this.roomAmenityOptionService.getAll();
  }

  @Mutation(() => RoomAmenityOption)
  async createRoomAmenityOption(
    @Args('createRoomAmenityOptionInput')
    createRoomAmenityOptionInput: CreateRoomAmenityOptionInput,
  ): Promise<RoomAmenityOption | null> {
    return this.roomAmenityOptionService.create(createRoomAmenityOptionInput);
  }

  @Mutation(() => RoomAmenityOption)
  async updateRoomAmenityOption(
    @Args('roomAmenityOptionId', { type: () => Int })
    roomAmenityOptionId: number,
    @Args('updateRoomAmenityOptionInput')
    updateRoomAmenityOptionInput: UpdateRoomAmenityOptionInput,
  ): Promise<RoomAmenityOption | null> {
    return this.roomAmenityOptionService.update(
      roomAmenityOptionId,
      updateRoomAmenityOptionInput,
    );
  }

  @Mutation(() => RoomAmenityOption)
  async deleteRoomAmenityOption(
    @Context() ctx: CtxType,
    @Args('roomAmenityOptionId', { type: () => Int })
    roomAmenityOptionId: number,
  ): Promise<RoomAmenityOption> {
    const userType = ctx.user.userType;
    if (userType !== UserType.SUPERADMIN) {
      throw new ForbiddenException(
        'You are not authorized to access this resource',
      );
    }
    return this.roomAmenityOptionService.delete(roomAmenityOptionId);
  }
}
