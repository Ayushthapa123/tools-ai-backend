import { Resolver, Query, Args, Int, Mutation, Context } from '@nestjs/graphql';
import { BlogPostService } from './blogPost.service';
import { BlogPost, BlogPostList, CtxType } from '@src/models/global.model';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@src/guards/auth.guard';
import { CreateBlogPostInput } from './dtos/create-blog.input';
import { UpdateBlogPostInput } from './dtos/update-blog.input';
import { BlogStatus, BlogTags, UserType } from '@prisma/client';
// import { Controller } from '@nestjs/common';

@Resolver(() => BlogPost)
export class BlogPostResolver {
  constructor(private readonly blogPostService: BlogPostService) {}

  @Query(() => BlogPostList)
  async getAllBlogPosts(
    @Args('pageSize', { type: () => Int, defaultValue: 150 }) pageSize: number,
    @Args('pageNumber', { type: () => Int, defaultValue: 1 })
    pageNumber: number,
    @Args('blogTags', {
      type: () => [BlogTags],
      nullable: true,
      defaultValue: [BlogTags.CITY],
    })
    blogTags: BlogTags[],
    @Args('blogStatus', {
      type: () => BlogStatus,
      nullable: true,
      defaultValue: null,
    })
    blogStatus: BlogStatus,
  ) {
    return this.blogPostService.getAllBlogPosts(
      pageSize,
      pageNumber,
      blogTags,
      blogStatus,
    ); // Issue is caused by the async return type. which is not required
  }

  @Query(() => BlogPost, { nullable: true })
  async getBlogPostById(@Args('id') id: number) {
    const res = await this.blogPostService.getBlogPostById(id);
    return res;
  }

  @Query(() => BlogPost, { nullable: true })
  async getBlogPostBySlug(@Args('slug') slug: string) {
    return this.blogPostService.getBlogPostBySlug(slug);
  }

  @Mutation(() => BlogPost)
  @UseGuards(AuthGuard)
  async createBlogPost(
    @Context() ctx: CtxType,
    @Args('data') data: CreateBlogPostInput,
  ) {
    // const userId = Number(ctx.user.sub);
    // prevent update by other users then writer or superadmin

    if (
      ctx.user.userType !== UserType.WRITER &&
      ctx.user.userType !== UserType.SUPERADMIN
    ) {
      throw new ForbiddenException('You are not allowed to create blog post');
    }

    return this.blogPostService.createBlogPost(data);
  }

  @Mutation(() => BlogPost)
  @UseGuards(AuthGuard)
  async updateBlogPost(
    @Args('data') data: UpdateBlogPostInput,
    @Context() ctx: CtxType,
  ) {
    // prevent update by other users then writer or superadmin
    if (
      ctx.user.userType !== UserType.WRITER &&
      ctx.user.userType !== UserType.SUPERADMIN
    ) {
      throw new ForbiddenException('You are not allowed to update blog post');
    }

    return this.blogPostService.updateBlogPost(data.id, data);
  }

  @Mutation(() => BlogPost)
  @UseGuards(AuthGuard)
  async deleteBlogPost(@Args('id') id: number, @Context() ctx: CtxType) {
    // prevent delete by other users then writer or superadmin
    if (
      ctx.user.userType !== UserType.WRITER &&
      ctx.user.userType !== UserType.SUPERADMIN
    ) {
      throw new ForbiddenException('You are not allowed to delete blog post');
    }

    return this.blogPostService.deleteBlogPost(id);
  }
}
