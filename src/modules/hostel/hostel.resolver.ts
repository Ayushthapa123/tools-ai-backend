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
import { HostelService } from './hostel.service';
import {
  CtxType,
  GraphQLError,
  Hostel,
  HostelData,
} from '@src/models/global.model';
import { CreateHostelInput } from './dtos/create-hostel.input';
import { UpdateHostelInput } from './dtos/update-hostel.input';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@src/guards/auth.guard';
import { UserType } from '@prisma/client';

// import { Controller } from '@nestjs/common';

@ObjectType()
class HostelArrayResponse {
  @Field(() => [HostelData])
  data: HostelData[];

  @Field(() => GraphQLError, { nullable: true })
  error: GraphQLError;
}
@Resolver(() => Hostel)
export class HostelResolver {
  constructor(private readonly hostelService: HostelService) {}

  @Query(() => HostelArrayResponse)
  async getAllHostels(
    @Args('pageSize', { type: () => Int, defaultValue: 50 }) pageSize: number,
    @Args('pageNumber', { type: () => Int, defaultValue: 1 })
    pageNumber: number,
    @Args('isSuperAdmin', {
      type: () => Boolean,
      defaultValue: false,
      nullable: true,
    }) // make it optional
    isSuperAdmin: boolean,
  ): Promise<HostelArrayResponse> {
    return this.hostelService.getAllHostels(
      pageSize,
      pageNumber,
      isSuperAdmin,
    ) as unknown as HostelArrayResponse; // Issue is caused by the async return type. which is not required
  }

  @Query(() => Hostel, { nullable: true })
  async getHostelById(@Args('hostelId') hostelId: number) {
    const res = await this.hostelService.getHostelById(hostelId);
    return res;
  }

  @Query(() => Hostel, { nullable: true })
  @UseGuards(AuthGuard)
  async getHostelByToken(@Context() ctx: CtxType) {
    const userId = Number(ctx.user.sub);

    return this.hostelService.getHostelBytoken(userId);
  }

  @Query(() => Hostel, { nullable: true })
  async getHostelBySlug(
    @Args('slug') slug: string,
    @Args('checkInDate', { nullable: true }) checkInDate?: Date,
    @Args('checkOutDate', { nullable: true }) checkOutDate?: Date,
  ) {
    return this.hostelService.getHostelBySlug(slug, checkInDate, checkOutDate);
  }

  @Mutation(() => Hostel)
  @UseGuards(AuthGuard)
  async createHostel(
    @Context() ctx: any,
    @Args('data') data: CreateHostelInput,
  ) {
    const userId = Number(ctx.user.sub);
    return this.hostelService.createHostel(userId, data);
  }

  @Mutation(() => Hostel)
  async updateHostel(
    @Args('hostelId') hostelId: number,
    @Args('data') data: UpdateHostelInput,
  ) {
    return this.hostelService.updateHostel(hostelId, data);
  }

  @Mutation(() => Hostel)
  async deleteHostel(@Args('hostelId') hostelId: number) {
    return this.hostelService.deleteHostel(hostelId);
  }

  @Mutation(() => Hostel)
  @UseGuards(AuthGuard)
  async verifyHostel(
    @Context() ctx: CtxType,
    @Args('hostelId', { type: () => Int }) hostelId: number,
    @Args('status', { type: () => Boolean }) status: boolean,
  ) {
    // prevent verify by other users then superadmin
    if (
      ctx.user.userType !== UserType.SUPERADMIN &&
      ctx.user.userType !== UserType.COMMUNITY_OWNER
    ) {
      throw new ForbiddenException('You are not allowed to verify hostel');
    }
    return this.hostelService.verifyHostel(hostelId, ctx.user.userType, status);
  }

  @Query(() => Hostel)
  @UseGuards(AuthGuard)
  async getOnboardingData(@Context() ctx: CtxType) {
    return this.hostelService.getOnboardingData(ctx.user.hostelId);
  }

  @Mutation(() => Hostel)
  @UseGuards(AuthGuard)
  async completeOnboarding(@Context() ctx: CtxType) {
    return this.hostelService.completeOnboarding(ctx.user.hostelId);
  }
}
