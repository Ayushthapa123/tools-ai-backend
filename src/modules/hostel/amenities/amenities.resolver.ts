import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@src/guards/auth.guard';
import { Amenities } from '@src/models/global.model';
import { AmenitiesService } from './amenities.service';
import { CreateAmenitiesInput } from './dtos/create-amenities.input';
import { UpdateAmenitiesInput } from './dtos/update-amenities.input';
import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';

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
  @UseGuards(AuthGuard)
  async getAmenitiesByHostelId(@Context() ctx: any): Promise<Amenities | null> {
    const hostelId = ctx.user.hostelId;
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
    return this.amenitiesService.updateAmenities(
      amenitiesId,
      updateAmenitiesInput,
    );
  }

  @Mutation(() => Amenities)
  async deleteAmenities(
    @Args('amenitiesId', { type: () => Int }) amenitiesId: number,
  ): Promise<Amenities> {
    return this.amenitiesService.deleteAmenities(amenitiesId);
  }
}
