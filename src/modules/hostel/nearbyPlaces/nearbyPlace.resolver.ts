import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@src/guards/auth.guard';
import { NearbyPlaceService } from './nearbyPlace.service';
import { NearbyPlace } from '../../../models/global.model';
import { CreateNearbyPlaceInput } from './dtos/create-nearby-place.input';
import { UpdateNearbyPlaceInput } from './dtos/update-nearby-place.input';
import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';

@Resolver(() => NearbyPlace)
export class NearbyPlaceResolver {
  constructor(private readonly nearbyPlaceService: NearbyPlaceService) {}

  @Query(() => NearbyPlace, { name: 'nearbyPlace' })
  @UseGuards(AuthGuard)
  async getNearbyPlaceById(
    @Context() ctx: any,
    @Args('nearbyPlaceId', { type: () => Int }) nearbyPlaceId: number,
  ): Promise<NearbyPlace | null> {
    const hostelId = Number(ctx.user.hostelId);
    return this.nearbyPlaceService.getNearbyPlaceById(nearbyPlaceId, hostelId);
  }

  @Query(() => [NearbyPlace], { name: 'nearbyPlaces' }) //name is unnecessary here
  @UseGuards(AuthGuard)
  async getNearbyPlacesByHostelId(
    @Context() ctx: any,
  ): Promise<NearbyPlace[] | null> {
    const hostelId = Number(ctx.user.hostelId);
    return this.nearbyPlaceService.getNearbyPlacesByHostelId(hostelId);
  }

  @Mutation(() => NearbyPlace)
  async createNearbyPlace(
    @Args('createNearbyPlaceInput')
    createNearbyPlaceInput: CreateNearbyPlaceInput,
  ): Promise<NearbyPlace> {
    return this.nearbyPlaceService.createNearbyPlace(createNearbyPlaceInput);
  }

  @Mutation(() => NearbyPlace)
  async updateNearbyPlace(
    @Args('updateNearbyPlaceInput')
    updateNearbyPlaceInput: UpdateNearbyPlaceInput,
  ): Promise<NearbyPlace> {
    return this.nearbyPlaceService.updateNearbyPlace(
      updateNearbyPlaceInput.nearbyPlaceId,
      updateNearbyPlaceInput,
    );
  }

  @Mutation(() => NearbyPlace)
  async deleteNearbyPlace(
    @Args('nearbyPlaceId', { type: () => Int }) nearbyPlaceId: number,
  ): Promise<NearbyPlace> {
    return this.nearbyPlaceService.deleteNearbyPlace(nearbyPlaceId);
  }
}
