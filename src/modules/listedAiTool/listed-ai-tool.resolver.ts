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
import {
  CtxType,
  GraphQLError,
  ListedAiTool,
  ListedAiToolData,
} from '@src/models/global.model';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@src/guards/auth.guard';
import { UserType } from '@prisma/client';
import { CookieService } from '../auth/services/cookie.service';
import { ListedAiToolService } from './listed-ai-tool.service';
import { CreateListedAiToolInput } from './dtos/create-listed-ai-tool.input';
import { UpdateListedAiToolInput } from './dtos/update-listed-ai-tool.input';

import { PrismaService } from '@src/prisma/prisma.service';
import { ToolUserType } from '@src/models/global.enum';
// import { Controller } from '@nestjs/common';

@ObjectType()
class ListedAiToolArrayResponse {
  @Field(() => [ListedAiToolData])
  data: ListedAiToolData[];

  @Field(() => GraphQLError, { nullable: true })
  error: GraphQLError;
}
@Resolver(() => ListedAiTool)
export class ListedAiToolResolver {
  constructor(
    private readonly listedAiToolService: ListedAiToolService,
    private readonly cookieService: CookieService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => ListedAiToolArrayResponse)
  async getAllListedAiTools(
    @Args('pageSize', { type: () => Int, defaultValue: 200 }) pageSize: number,
    @Args('pageNumber', { type: () => Int, defaultValue: 1 })
    pageNumber: number,
    @Args('isSuperAdmin', {
      type: () => Boolean,
      defaultValue: false,
      nullable: true,
    }) // make it optional
    isSuperAdmin: boolean,
  ) {
    return this.listedAiToolService.getAllListedAiTools(
      pageSize,
      pageNumber,
      isSuperAdmin,
    ); // Issue is caused by the async return type. which is not required
  }

  @Query(() => ListedAiToolArrayResponse)
  async getListedAiToolsWithHighPopularityScore(
    @Args('pageSize', { type: () => Int, defaultValue: 6 }) pageSize: number,
    @Args('pageNumber', { type: () => Int, defaultValue: 1 })
    pageNumber: number,
    @Args('isSuperAdmin', {
      type: () => Boolean,
      defaultValue: false,
      nullable: true,
    }) // make it optional
    isSuperAdmin: boolean,
  ) {
    return this.listedAiToolService.getListedAiToolsWithHighPopularityScore(
      pageSize,
      pageNumber,
      isSuperAdmin,
    );
  }

  @Query(() => ListedAiToolArrayResponse)
  async getListedAiToolsByUserType(
    @Args('pageSize', { type: () => Int, defaultValue: 6 }) pageSize: number,
    @Args('pageNumber', { type: () => Int, defaultValue: 1 })
    pageNumber: number,
    @Args('userType', { type: () => ToolUserType }) userType: ToolUserType,
  ) {
    return this.listedAiToolService.getListedAiToolsByUserType(
      pageSize,
      pageNumber,
      userType,
    );
  }

  @UseGuards(AuthGuard)
  @Query(() => ListedAiToolArrayResponse)
  async getListedAiToolsByUserToken(
    @Args('pageSize', { type: () => Int, defaultValue: 30 }) pageSize: number,
    @Args('pageNumber', { type: () => Int, defaultValue: 1 })
    pageNumber: number,
    @Context() ctx: CtxType,
  ): Promise<ListedAiToolArrayResponse> {
    return this.listedAiToolService.getListedAiToolsByUserId(
      pageSize,
      pageNumber,
      ctx.user.sub,
    ) as unknown as ListedAiToolArrayResponse; // Issue is caused by the async return type. which is not required
  }

  @Query(() => ListedAiTool, { nullable: true })
  async getListedAiToolById(@Args('toolId') toolId: number) {
    const res = await this.listedAiToolService.getListedAiToolById(toolId);
    return res;
  }

  @Query(() => ListedAiTool, { nullable: true })
  async getListedAiToolBySlug(@Args('slug') slug: string) {
    const res = await this.listedAiToolService.getListedAiToolBySlug(slug);
    return res;
  }

  @Mutation(() => ListedAiTool)
  @UseGuards(AuthGuard)
  async createListedAiTool(
    @Context() ctx: CtxType,
    @Args('data') data: CreateListedAiToolInput,
  ) {
    const userId = Number(ctx.user.sub);
    return this.listedAiToolService.createListedAiTool(userId, data);
  }

  @Mutation(() => ListedAiTool)
  async createListedAiToolAnonymously(
    @Args('data') data: CreateListedAiToolInput,
  ) {
    return this.listedAiToolService.createListedAiToolAnonymously(data);
  }

  @Mutation(() => ListedAiTool)
  async createListedAiToolFromArray(
    @Args('userId', { type: () => Int, defaultValue: 1 }) userId: number,
  ) {
    if (userId !== 9394) {
      throw new ForbiddenException('You are not allowed to update tool');
    }
    console.log('userId', userId);
    return this.listedAiToolService.createListedAiToolFromArray();
  }

  @Mutation(() => ListedAiTool)
  async updateListedAiToolFromArrayForVideoUrl(
    @Args('userId', { type: () => Int, defaultValue: 1 }) userId: number,
  ) {
    console.log('userId', userId);
    if (userId !== 9394) {
      throw new ForbiddenException('You are not allowed to update tool');
    }
    return this.listedAiToolService.updateListedAiToolFromArrayForVideoUrl();
  }

  @Mutation(() => ListedAiTool)
  async updateListedAiTool(
    @Args('toolId') toolId: number,
    @Args('data') data: UpdateListedAiToolInput,
  ) {
    return this.listedAiToolService.updateListedAiTool(toolId, data);
  }

  @Mutation(() => ListedAiTool)
  async deleteListedAiTool(@Args('toolId') toolId: number) {
    return this.listedAiToolService.deleteListedAiTool(toolId);
  }

  @Mutation(() => ListedAiTool)
  @UseGuards(AuthGuard)
  async verifyListedAiTool(
    @Context() ctx: CtxType,
    @Args('toolId', { type: () => Int }) toolId: number,
    @Args('status', { type: () => Boolean }) status: boolean,
  ) {
    // prevent verify by other users then superadmin
    if (ctx.user.userType !== UserType.ADMIN) {
      throw new ForbiddenException('You are not allowed to verify tool');
    }
    return this.listedAiToolService.verifyListedAiTool(
      toolId,
      ctx.user.userType,
      status,
    );
  }
}
