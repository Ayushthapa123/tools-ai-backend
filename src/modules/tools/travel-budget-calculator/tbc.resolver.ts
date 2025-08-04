// src/auth/auth.resolver.ts

import { Resolver, Args, Mutation } from '@nestjs/graphql';

import { TbcService } from './tbc.service';
import { TravelBudgetCalculatorInput } from './dto/tbc.input';
import { TBCList } from './models/tbc.model';
@Resolver()
export class TbcResolver {
  constructor(private readonly tbcService: TbcService) {}

  @Mutation(() => TBCList)
  async getTravelBudget(@Args('input') input: TravelBudgetCalculatorInput) {
    console.log('input', input);
    return this.tbcService.getTravelBudget(input);
  }
}
