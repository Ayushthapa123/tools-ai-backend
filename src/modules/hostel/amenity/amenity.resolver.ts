import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AmenityService } from './amenity.service';
import { Amenities } from '@src/models/global.model';
import { CreateAmenityInput } from './dto/create-amenity.dto';
import { UpdateAmenityInput } from './dto/update-amenity.dto';

@Resolver(() => Amenities)
export class AmenityResolver {
  constructor(private readonly amenityService: AmenityService) {}

  @Query(() => [Amenities])
  findAllAmenities() {
    return this.amenityService.findAll();
  }

  @Query(() => Amenities)
  findAnAmenityById(@Args('id', { type: () => Int }) id: number) {
    return this.amenityService.findOne(id);
  }

  @Query(() => Amenities)
  findAmenityByHostelId(
    @Args('hostelId', { type: () => Int }) hostelId: number,
  ) {
    return this.amenityService.findByHostelId(hostelId);
  }

  @Mutation(() => Amenities)
  createAmenity(
    @Args('createAmenityInput') createAmenityInput: CreateAmenityInput,
  ) {
    return this.amenityService.create(createAmenityInput);
  }

  @Mutation(() => Amenities)
  updateAmenity(
    @Args('updateAmenityInput') updateAmenityInput: UpdateAmenityInput,
  ) {
    return this.amenityService.update(updateAmenityInput);
  }

  @Mutation(() => Amenities)
  removeAmenity(@Args('id', { type: () => Int }) id: number) {
    return this.amenityService.remove(id);
  }
}
