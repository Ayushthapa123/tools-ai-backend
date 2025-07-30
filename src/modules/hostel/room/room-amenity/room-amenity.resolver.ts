import { Int, Query, Mutation, Args, Resolver, Context } from '@nestjs/graphql';
import { RoomAmenityService } from './room-amenity.service';
import { CtxType, RoomAmenity } from '@src/models/global.model';
import { UpdateRoomAmenityInput } from './dto/update-amenity.dto';
import { CreateRoomAmenityInput } from './dto/create-amenity.dto';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@src/guards/auth.guard';
import { UserType } from '@prisma/client';

@UseGuards(AuthGuard)
@Resolver()
export class RoomAmenityResolver {
  constructor(private readonly roomAmenityService: RoomAmenityService) {}

  @Query(() => [RoomAmenity])
  findAllAmenities() {
    return this.roomAmenityService.findAll();
  }

  @Query(() => RoomAmenity)
  findAnAmenityById(@Args('id', { type: () => Int }) id: number) {
    return this.roomAmenityService.findOne(id);
  }

  @Query(() => RoomAmenity)
  findAmenityByRoomId(@Args('roomId', { type: () => Int }) roomId: number) {
    return this.roomAmenityService.findByRoomId(roomId);
  }

  @Mutation(() => RoomAmenity)
  createRoomAmenity(
    @Context() ctx: CtxType,
    @Args('createAmenityInput') createAmenityInput: CreateRoomAmenityInput,
  ) {
    // prevent create by other users then superadmin
    if (ctx.user.userType !== UserType.SUPERADMIN) {
      throw new ForbiddenException(
        'You are not authorized to access this resource',
      );
    }
    return this.roomAmenityService.create(createAmenityInput);
  }

  @Mutation(() => RoomAmenity)
  updateRoomAmenity(
    @Args('updateAmenityInput') updateAmenityInput: UpdateRoomAmenityInput,
  ) {
    // prevent update by other users then superadmin

    return this.roomAmenityService.update(updateAmenityInput);
  }

  @Mutation(() => RoomAmenity)
  removeRoomAmenity(
    @Args('roomAmenityId', { type: () => Int }) roomAmenityId: number,
    @Context() ctx: CtxType,
  ) {
    // prevent remove by other users then superadmin
    if (ctx.user.userType !== UserType.SUPERADMIN) {
      throw new ForbiddenException(
        'You are not authorized to access this resource',
      );
    }
    return this.roomAmenityService.remove(roomAmenityId);
  }
}
