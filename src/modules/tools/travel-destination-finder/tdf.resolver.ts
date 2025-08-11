// src/auth/auth.resolver.ts

import { Resolver, Args, Mutation } from '@nestjs/graphql';

import { TdfService } from './tdf.service';
import { TravelDestinationFinderInput } from './dto/tdf.input';
import { TDFList } from './models/tdf.model';
@Resolver()
export class TdfResolver {
  constructor(private readonly tdfService: TdfService) {}

  @Mutation(() => TDFList)
  async getTravelDestination(
    @Args('input') input: TravelDestinationFinderInput,
  ) {
    console.log('input', input);
    return this.tdfService.getTravelDestination(input);
  }
}
