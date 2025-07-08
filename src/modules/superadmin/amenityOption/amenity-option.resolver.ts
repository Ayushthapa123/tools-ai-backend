import {
  AmenityOption,
  AmenityOptionList,
  CtxType,
} from '@src/models/global.model';
import { AmenityOptionService } from './amenity-option.services';
import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { CreateAmenityOptionInput } from './dtos/create-amenity-option.input';
import { UpdateAmenityOptionInput } from './dtos/update-amenity-option.input';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@src/guards/auth.guard';
import { UserType } from '@prisma/client';

@UseGuards(AuthGuard)
@Resolver(() => AmenityOption)
export class AmenityOptionResolver {
  constructor(private readonly amenityOptionService: AmenityOptionService) {}

  @Query(() => AmenityOption, { name: 'amenityOptionById' })
  async getAmenityOptionById(@Args('id', { type: () => Int }) id: number) {
    return this.amenityOptionService.getAmenityOptionById(id);
  }

  // @UseGuards(AuthGuard)
  @Query(() => AmenityOptionList, { name: 'amenityOptions' })
  async getAllAmenityOptions(@Context() ctx: CtxType) {
    const userType = ctx.user.userType;
    if (userType !== UserType.SUPERADMIN) {
      throw new ForbiddenException(
        'You are not authorized to access this resource',
      );
    }
    return this.amenityOptionService.getAll();
  }

  @Mutation(() => AmenityOption)
  async createAmenityOption(
    @Context() ctx: CtxType,
    @Args('createAmenityOptionInput')
    createAmenityOptionInput: CreateAmenityOptionInput,
  ) {
    // prevent create by other users then superadmin
    if (ctx.user.userType !== UserType.SUPERADMIN) {
      throw new ForbiddenException(
        'You are not authorized to access this resource',
      );
    }
    return this.amenityOptionService.create(createAmenityOptionInput);
  }

  @Mutation(() => AmenityOption)
  async updateAmenityOption(
    @Context() ctx: CtxType,
    @Args('amenityOptionId', { type: () => Int }) amenityOptionId: number,
    @Args('updateAmenityOptionInput')
    updateAmenityOptionInput: UpdateAmenityOptionInput,
  ) {
    // prevent update by other users then superadmin
    if (ctx.user.userType !== UserType.SUPERADMIN) {
      throw new ForbiddenException(
        'You are not authorized to access this resource',
      );
    }
    return this.amenityOptionService.update(
      amenityOptionId,
      updateAmenityOptionInput,
    );
  }

  // @UseGuards(AuthGuard)
  @Mutation(() => AmenityOption)
  async deleteAmenityOption(
    @Context() ctx: CtxType,
    @Args('amenityOptionId', { type: () => Int }) amenityOptionId: number,
  ) {
    const userType = ctx.user.userType;
    if (userType !== UserType.SUPERADMIN) {
      throw new ForbiddenException(
        'You are not authorized to access this resource',
      );
    }
    return this.amenityOptionService.delete(amenityOptionId);
  }
}
