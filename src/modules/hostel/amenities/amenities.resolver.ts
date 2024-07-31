import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AmenitiesService } from './amenities.service';
import { CreateAmenitiesInput } from './dtos/create-amenities.input';
import { UpdateAmenitiesInput } from './dtos/update-amenities.input';
import { Amenities } from '@src/models/global.model';

@Resolver(() => Amenities)
export class AmenitiesResolver {
  constructor(private readonly amenitiesService: AmenitiesService) {}

  @Query(() => Amenities, { name: 'amenity' })
  async getAmenitiesById(
    @Args('amenitiesId', { type: () => Int }) amenitiesId: number,
  ): Promise<Amenities | null> {
    return this.amenitiesService.getAmenitiesById(amenitiesId);
  }

  @Query(() => Amenities, { name: 'amenitiesByHostelId' })
  async getAmenitiesByHostelId(
    @Args('hostelId', { type: () => Int }) hostelId: number,
  ): Promise<Amenities | null> {
    return this.amenitiesService.getAmenitiesByHostelId(hostelId);
  }

  @Mutation(() => Amenities)
  async createAmenities(
    @Args('createAmenitiesInput') createAmenitiesInput: CreateAmenitiesInput,
  ): Promise<Amenities> {
    return this.amenitiesService.createAmenities(createAmenitiesInput);
  }

  @Mutation(() => Amenities)
  async updateAmenities(
    @Args('amenitiesId', { type: () => Int }) amenitiesId: number,
    @Args('updateAmenitiesInput') updateAmenitiesInput: UpdateAmenitiesInput,
  ): Promise<Amenities> {
    return this.amenitiesService.updateAmenities(amenitiesId, updateAmenitiesInput);
  }

  @Mutation(() => Amenities)
  async deleteAmenities(
    @Args('amenitiesId', { type: () => Int }) amenitiesId: number,
  ): Promise<Amenities> {
    return this.amenitiesService.deleteAmenities(amenitiesId);
  }
}
