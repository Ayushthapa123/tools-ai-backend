import {
  Resolver,
  Query,
  Args,
  Int,
  Mutation,
  Context,
  ObjectType,
  Field,
} from '@nestjs/graphql';
import { HomestayService } from './homestay.service';
import {
  CtxType,
  GraphQLError,
  Homestay,
  HomestayData,
} from '@src/models/global.model';
import { CreateHomestayInput } from './dtos/create-homestay.input';
import { UpdateHomestayInput } from './dtos/update-homestay.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@src/guards/auth.guard';

// import { Controller } from '@nestjs/common';

@ObjectType()
class HomestayResponse {
  @Field(() => [HomestayData])
  data: HomestayData[];

  @Field(() => GraphQLError, { nullable: true })
  error: GraphQLError;
}
@Resolver(() => Homestay)
export class HomestayResolver {
  constructor(private readonly homestayService: HomestayService) {}

  @Query(() => HomestayResponse)
  async getAllHomestays(
    @Args('pageSize', { type: () => Int, defaultValue: 10 }) pageSize: number,
    @Args('pageNumber', { type: () => Int, defaultValue: 1 })
    pageNumber: number,
  ): Promise<HomestayResponse> {
    return this.homestayService.getAllHomestays(
      pageSize,
      pageNumber,
    ) as unknown as HomestayResponse;
  }

  @Query(() => Homestay, { nullable: true })
  async getHomestayById(
    @Args('homestayId') homestayId: number,
  ): Promise<Homestay | null> {
    return this.homestayService.getHomestayById(homestayId);
  }

  @Query(() => Homestay, { nullable: true })
  @UseGuards(AuthGuard)
  async getHomestayByToken(@Context() ctx: CtxType) {
    const userId = Number(ctx.user.sub);

    return this.homestayService.getHomestayBytoken(userId);
  }

  @Query(() => Homestay, { nullable: true })
  async getHomestayBySlug(
    @Args('slug') slug: string,
    @Args('checkInDate', { nullable: true }) checkInDate?: Date,
    @Args('checkOutDate', { nullable: true }) checkOutDate?: Date,
  ): Promise<Homestay | null> {
    return this.homestayService.getHomestayBySlug(
      slug,
      checkInDate,
      checkOutDate,
    );
  }

  @Mutation(() => Homestay)
  @UseGuards(AuthGuard)
  async createHomestay(
    @Context() ctx: any,
    @Args('data') data: CreateHomestayInput,
  ): Promise<Homestay> {
    const userId = Number(ctx.user.sub);
    return this.homestayService.createHomestay(userId, data);
  }

  @Mutation(() => Homestay)
  async updateHomestay(
    @Args('homestayId') homestayId: number,
    @Args('data') data: UpdateHomestayInput,
  ): Promise<Homestay> {
    return this.homestayService.updateHomestay(homestayId, data);
  }

  @Mutation(() => Homestay)
  async deleteHomestay(
    @Args('homestayId') homestayId: number,
  ): Promise<Homestay> {
    return this.homestayService.deleteHomestay(homestayId);
  }

  @Mutation(() => Homestay)
  @UseGuards(AuthGuard)
  async verifyHomestay(
    @Context() ctx: CtxType,
    @Args('homestayId', { type: () => Int }) homestayId: number,
    @Args('status', { type: () => Boolean }) status: boolean,
  ): Promise<Homestay> {
    return this.homestayService.verifyHomestay(
      homestayId,
      ctx.user.userType,
      status,
    );
  }
}
