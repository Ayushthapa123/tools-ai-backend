import { Int, Query, Mutation, Args, Resolver } from '@nestjs/graphql';
import { RoomAmenityService } from './room-amenity.service';
import { RoomAmenity } from '@src/models/global.model';
import { UpdateRoomAmenityInput } from './dto/update-amenity.dto';
import { CreateRoomAmenityInput } from './dto/create-amenity.dto';

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
    @Args('createAmenityInput') createAmenityInput: CreateRoomAmenityInput,
  ) {
    return this.roomAmenityService.create(createAmenityInput);
  }

  @Mutation(() => RoomAmenity)
  updateRoomAmenity(
    @Args('updateAmenityInput') updateAmenityInput: UpdateRoomAmenityInput,
  ) {
    return this.roomAmenityService.update(updateAmenityInput);
  }

  @Mutation(() => RoomAmenity)
  removeRoomAmenity(
    @Args('roomAmenityId', { type: () => Int }) roomAmenityId: number,
  ) {
    return this.roomAmenityService.remove(roomAmenityId);
  }
}
