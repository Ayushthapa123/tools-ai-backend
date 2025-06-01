import {
  RoomAmenityOption,
  RoomAmenityOptionList,
} from '@src/models/global.model';
import { RoomAmenityOptionService } from './amenity-option.services';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreateRoomAmenityOptionInput } from './dtos/create-amenity-option.input';
import { UpdateRoomAmenityOptionInput } from './dtos/update-amenity-option.input';

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
    @Args('roomAmenityOptionId', { type: () => Int })
    roomAmenityOptionId: number,
  ): Promise<RoomAmenityOption> {
    return this.roomAmenityOptionService.delete(roomAmenityOptionId);
  }
}
