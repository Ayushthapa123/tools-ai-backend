import { GoogleMapLocation } from '../../../models/global.model';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GoogleMapLocationService } from './googleMapLocation.services';
import { UpdateGoogleMapLocation } from './dtos/update-googleMapLocation.input';
import { CreateGoogleMapLocationInput } from './dtos/create-googleMapLocation.input';

@Resolver(() => GoogleMapLocation)
export class GoogleMapLocationResolver {
  constructor(
    private readonly googleMapLocationService: GoogleMapLocationService,
  ) {}

  @Query(() => GoogleMapLocation, { name: 'googleMapLocation' })
  async getGoogleMapLocationById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<GoogleMapLocation | null> {
    return this.googleMapLocationService.getGoogleMapLocationByHostelId(id);
  }

  @Mutation(() => GoogleMapLocation)
  async createGoogleMapLocation(
    @Args('hostelId', { type: () => Int })
    hostelId: number,
    @Args('data') data: CreateGoogleMapLocationInput,
  ): Promise<GoogleMapLocation> {
    return this.googleMapLocationService.createGoogleMapLocation(
      hostelId,
      data,
    );
  }

  @Mutation(() => GoogleMapLocation)
  async updateGoogleMapLocation(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: UpdateGoogleMapLocation,
  ): Promise<GoogleMapLocation> {
    return this.googleMapLocationService.updateGoogleMapLocation(id, data);
  }

  @Mutation(() => GoogleMapLocation)
  async deleteGoogleMapLocation(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<GoogleMapLocation> {
    return this.googleMapLocationService.deleteGoogleMapLocation(id);
  }
}
