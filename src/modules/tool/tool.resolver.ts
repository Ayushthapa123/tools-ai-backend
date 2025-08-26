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
  Tool,
  ToolData,
} from '@src/models/global.model';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@src/guards/auth.guard';
import { UserType } from '@prisma/client';
import { CookieService } from '../auth/services/cookie.service';
import { ToolService } from './tool.service';
import { CreateToolInput } from './dtos/create-tool.input';
import { UpdateToolInput } from './dtos/update-tool.input';
// import { Controller } from '@nestjs/common';

@ObjectType()
class ToolArrayResponse {
  @Field(() => [ToolData])
  data: ToolData[];

  @Field(() => GraphQLError, { nullable: true })
  error: GraphQLError;
}
@Resolver(() => Tool)
export class ToolResolver {
  constructor(
    private readonly toolService: ToolService,
    private readonly cookieService: CookieService,
  ) {}

  @Query(() => ToolArrayResponse)
  async getAllTools(
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
    return this.toolService.getAllTools(pageSize, pageNumber, isSuperAdmin); // Issue is caused by the async return type. which is not required
  }

  @UseGuards(AuthGuard)
  @Query(() => ToolArrayResponse)
  async getToolsByUserToken(
    @Args('pageSize', { type: () => Int, defaultValue: 30 }) pageSize: number,
    @Args('pageNumber', { type: () => Int, defaultValue: 1 })
    pageNumber: number,
    @Context() ctx: CtxType,
  ): Promise<ToolArrayResponse> {
    return this.toolService.getToolsByUserId(
      pageSize,
      pageNumber,
      ctx.user.sub,
    ) as unknown as ToolArrayResponse; // Issue is caused by the async return type. which is not required
  }

  @Query(() => Tool, { nullable: true })
  async getToolById(@Args('toolId') toolId: number) {
    const res = await this.toolService.getToolById(toolId);
    return res;
  }

  @Query(() => Tool, { nullable: true })
  async getToolBySlug(@Args('slug') slug: string) {
    return this.toolService.getToolBySlug(slug);
  }

  @Mutation(() => Tool)
  @UseGuards(AuthGuard)
  async createTool(
    @Context() ctx: CtxType,
    @Args('data') data: CreateToolInput,
  ) {
    const userId = Number(ctx.user.sub);
    return this.toolService.createTool(userId, data);
  }

  @Mutation(() => Tool)
  async updateTool(
    @Args('toolId') toolId: number,
    @Args('data') data: UpdateToolInput,
  ) {
    return this.toolService.updateTool(toolId, data);
  }

  @Mutation(() => Tool)
  async deleteTool(@Args('toolId') toolId: number) {
    return this.toolService.deleteTool(toolId);
  }

  @Mutation(() => Tool)
  @UseGuards(AuthGuard)
  async verifyTool(
    @Context() ctx: CtxType,
    @Args('toolId', { type: () => Int }) toolId: number,
    @Args('status', { type: () => Boolean }) status: boolean,
  ) {
    // prevent verify by other users then superadmin
    if (ctx.user.userType !== UserType.ADMIN) {
      throw new ForbiddenException('You are not allowed to verify tool');
    }
    return this.toolService.verifyTool(toolId, ctx.user.userType, status);
  }
}
