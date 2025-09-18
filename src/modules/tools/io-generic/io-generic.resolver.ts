// src/auth/auth.resolver.ts

import { Resolver, Args, Mutation } from '@nestjs/graphql';

import { IoGenericService } from './io-generic.service';
import { IOGenericInput } from './dto/io-generic.input';
import { IOGeneric, IOGenericTextToImage } from './models/io-generic.model';
@Resolver()
export class IoGenericResolver {
  constructor(private readonly ioGenericService: IoGenericService) {}

  @Mutation(() => IOGeneric)
  async processGenericIO(@Args('input') input: IOGenericInput) {
    console.log('input', input);
    return this.ioGenericService.processGenericIO(input);
  }

  @Mutation(() => IOGeneric)
  async processGenericIOTextToImageOpenAI(
    @Args('input') input: IOGenericInput,
  ) {
    console.log('input', input);
    return this.ioGenericService.processGenericIOTextToImageOpenAI(input);
  }

  @Mutation(() => IOGenericTextToImage)
  async processGenericIOTextToImageGemini(
    @Args('input') input: IOGenericInput,
  ) {
    console.log('input', input);
    return this.ioGenericService.processGenericIOTextToImageGemini(input);
  }
  @Mutation(() => IOGenericTextToImage)
  async processGenericIOTextToImageGeminiTest(@Args('prompt') prompt: string) {
    return this.ioGenericService.processGenericIOTextToImageGeminiTest(prompt);
  }
}
