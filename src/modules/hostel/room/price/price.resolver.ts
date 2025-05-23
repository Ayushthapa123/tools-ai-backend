import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { PriceService } from './price.service';
import { Price } from '@src/models/global.model';
import { CreatePriceInput } from './dtos/create-price.input';
import { UpdatePriceInput } from './dtos/update-price.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@src/guards/auth.guard';

@Resolver(() => Price)
export class PriceResolver {
  constructor(private readonly priceService: PriceService) {}

  @Mutation(() => Price)
  @UseGuards(AuthGuard)
  createPrice(
    @Args('createPriceInput') createPriceInput: CreatePriceInput,
    @Context() ctx: any,
  ) {
    if (!ctx.user?.hostelId) {
      throw new Error('User does not have a hostel associated');
    }
    return this.priceService.create(createPriceInput, ctx.user.hostelId);
  }

  @Query(() => [Price], { name: 'prices' })
  findAll() {
    return this.priceService.findAll();
  }

  @Query(() => Price, { name: 'price' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.priceService.findOne(id);
  }

  @Query(() => Price, { name: 'priceByRoom' })
  findPriceByRoomId(@Args('roomId', { type: () => Int }) roomId: number) {
    return this.priceService.findPriceByRoomId(roomId);
  }

  @Mutation(() => Price)
  @UseGuards(AuthGuard)
  updatePrice(
    @Args('updatePriceInput') updatePriceInput: UpdatePriceInput,
    @Context() ctx: any,
  ) {
    if (!ctx.user?.hostelId) {
      return {
        data: null,
        error: {
          message: 'User does not have a hostel associated',
        },
      };
    }
    return this.priceService.update(updatePriceInput, ctx.user.hostelId);
  }

  @Mutation(() => Price)
  @UseGuards(AuthGuard)
  removePrice(
    @Args('id', { type: () => Int }) id: number,
    @Context() ctx: any,
  ) {
    if (!ctx.user?.hostelId) {
      throw new Error('User does not have a hostel associated');
    }
    return this.priceService.remove(id, ctx.user.hostelId);
  }
}
