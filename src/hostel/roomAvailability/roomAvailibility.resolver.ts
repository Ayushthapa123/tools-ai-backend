import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { RoomAvailibilityService } from './roomAvailibility.service';

import { RoomAvailability } from '../../models/global.model';
import { CreateRoomAvailibilityInput } from './dtos/create-room-availibility.input';
import { UpdateRoomAvailibilityInput } from './dtos/update-room-availibility.input';

// import { Controller } from '@nestjs/common';

@Resolver(() => RoomAvailability)
// @Controller('hostel') // thats not possible to just create hostel namespace I guess. It must have something
export class RoomAvailibilityResolver {
  constructor(
    private readonly roomAvailibilityService: RoomAvailibilityService,
  ) {}

  @Query(() => RoomAvailability, { nullable: true })
  async getAddressByHostelId(
    @Args('hostelId') hostelId: number,
  ): Promise<RoomAvailability | null> {
    return this.roomAvailibilityService.getRoomAvailibilityByHostelId(hostelId);
  }

  @Mutation(() => RoomAvailability)
  async createAddress(
    @Args('data') data: CreateRoomAvailibilityInput,
  ): Promise<RoomAvailability> {
    return this.roomAvailibilityService.createRoomAvailibility(data);
  }

  @Mutation(() => RoomAvailability)
  async updateAddress(
    @Args('addressId') addressId: number,
    @Args('data') data: UpdateRoomAvailibilityInput,
  ): Promise<RoomAvailability> {
    return this.roomAvailibilityService.updateRoomAvailibility(addressId, data);
  }
}
