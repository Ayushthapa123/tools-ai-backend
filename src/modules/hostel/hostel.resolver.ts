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
  User,
} from '@src/models/global.model';
import {
  CreateHostelInput,
  CreateOnboardingHostelInput,
} from './dtos/create-hostel.input';
import { UpdateHostelInput } from './dtos/update-hostel.input';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@src/guards/auth.guard';
import { UserType } from '@prisma/client';
import { generateJwtTokens } from '@src/helpers/jwt.helper';
import { CookieService } from '../auth/services/cookie.service';
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
  constructor(
    private readonly hostelService: HostelService,
    private readonly cookieService: CookieService,
  ) {}

  @Query(() => HostelArrayResponse)
  async getAllHostels(
    @Args('pageSize', { type: () => Int, defaultValue: 200 }) pageSize: number,
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

  @UseGuards(AuthGuard)
  @Query(() => HostelArrayResponse)
  async getHostelsByUserToken(
    @Args('pageSize', { type: () => Int, defaultValue: 30 }) pageSize: number,
    @Args('pageNumber', { type: () => Int, defaultValue: 1 })
    pageNumber: number,
    @Context() ctx: CtxType,
  ): Promise<HostelArrayResponse> {
    return this.hostelService.getHostelsByUserId(
      pageSize,
      pageNumber,
      ctx.user.sub,
    ) as unknown as HostelArrayResponse; // Issue is caused by the async return type. which is not required
  }

  @Query(() => Hostel, { nullable: true })
  async getHostelById(@Args('hostelId') hostelId: number) {
    const res = await this.hostelService.getHostelById(hostelId);
    return res;
  }
  @Query(() => Hostel, { nullable: true })
  @UseGuards(AuthGuard)
  async getActiveHostel(@Context() ctx: CtxType) {
    const hostelId = Number(ctx.user.hostelId);
    const res = await this.hostelService.getHostelById(hostelId);
    return res;
  }

  @Query(() => Hostel, { nullable: true })
  @UseGuards(AuthGuard)
  async getHostelByToken(@Context() ctx: CtxType) {
    const hostelId = Number(ctx.user.hostelId);

    return this.hostelService.getHostelBytoken(hostelId);
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
    @Context() ctx: CtxType,
    @Args('data') data: CreateHostelInput,
  ) {
    const userId = Number(ctx.user.sub);
    return this.hostelService.createHostel(userId, data);
  }

  @Mutation(() => Hostel)
  @UseGuards(AuthGuard)
  async createOnboardingHostel(
    @Context() ctx: CtxType,
    @Args('data') data: CreateOnboardingHostelInput,
  ) {
    const userId = Number(ctx.user.sub);
    // @ts-expect-error
    return this.hostelService.createOnboardingHostel(userId, data, ctx);
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

  @Mutation(() => User)
  @UseGuards(AuthGuard)
  async changeCurrentHostel(
    @Context() ctx: CtxType,
    @Args('hostelId', { type: () => Int }) hostelId: number,
  ) {
    const { accessToken, refreshToken } = generateJwtTokens(
      ctx.user.sub,
      UserType.HOSTEL_OWNER,
      hostelId,
    );
    this.cookieService.setAuthCookies(
      // @ts-expect-error
      ctx.res,
      accessToken,
      refreshToken,
      // @ts-expect-error
      ctx.req.headers.referer,
    );
    return this.hostelService.changeCurrentHostel(ctx.user.sub, hostelId);
  }
}
