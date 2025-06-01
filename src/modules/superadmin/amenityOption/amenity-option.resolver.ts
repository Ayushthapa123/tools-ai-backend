import { AmenityOption, AmenityOptionList } from '@src/models/global.model';
import { AmenityOptionService } from './amenity-option.services';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreateAmenityOptionInput } from './dtos/create-amenity-option.input';
import { UpdateAmenityOptionInput } from './dtos/update-amenity-option.input';

@Resolver(() => AmenityOption)
export class AmenityOptionResolver {
  constructor(private readonly amenityOptionService: AmenityOptionService) {}

  @Query(() => AmenityOption, { name: 'amenityOptionById' })
  async getAmenityOptionById(@Args('id', { type: () => Int }) id: number) {
    return this.amenityOptionService.getAmenityOptionById(id);
  }

  @Query(() => AmenityOptionList, { name: 'amenityOptions' })
  async getAllAmenityOptions() {
    return this.amenityOptionService.getAll();
  }

  @Mutation(() => AmenityOption)
  async createAmenityOption(
    @Args('createAmenityOptionInput')
    createAmenityOptionInput: CreateAmenityOptionInput,
  ) {
    return this.amenityOptionService.create(createAmenityOptionInput);
  }

  @Mutation(() => AmenityOption)
  async updateAmenityOption(
    @Args('amenityOptionId', { type: () => Int }) amenityOptionId: number,
    @Args('updateAmenityOptionInput')
    updateAmenityOptionInput: UpdateAmenityOptionInput,
  ) {
    return this.amenityOptionService.update(
      amenityOptionId,
      updateAmenityOptionInput,
    );
  }

  @Mutation(() => AmenityOption)
  async deleteAmenityOption(
    @Args('amenityOptionId', { type: () => Int }) amenityOptionId: number,
  ) {
    return this.amenityOptionService.delete(amenityOptionId);
  }
}
