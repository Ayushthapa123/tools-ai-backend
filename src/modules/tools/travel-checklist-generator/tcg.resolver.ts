// src/auth/auth.resolver.ts

import { Resolver, Args, Mutation } from '@nestjs/graphql';

import { TcgService } from './tcg.service';
import { TravelChecklistGeneratorInput } from './dto/tcg.input';
import { TCGList } from './models/tcg.model';
@Resolver()
export class TcgResolver {
  constructor(private readonly tcgService: TcgService) {}

  @Mutation(() => TCGList)
  async getTravelChecklist(
    @Args('input') input: TravelChecklistGeneratorInput,
  ) {
    console.log('input', input);
    return this.tcgService.getTravelChecklist(input);
  }
}
