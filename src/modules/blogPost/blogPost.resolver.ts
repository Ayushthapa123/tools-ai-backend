import { Resolver, Query, Args, Int, Mutation, Context } from '@nestjs/graphql';
import { BlogPostService } from './blogPost.service';
import { BlogPost, BlogPostList } from '@src/models/global.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@src/guards/auth.guard';
import { CreateBlogPostInput } from './dtos/create-blog.input';
import { UpdateBlogPostInput } from './dtos/update-blog.input';
// import { Controller } from '@nestjs/common';

@Resolver(() => BlogPost)
export class BlogPostResolver {
  constructor(private readonly blogPostService: BlogPostService) {}

  @Query(() => BlogPostList)
  async getAllBlogPosts(
    @Args('pageSize', { type: () => Int, defaultValue: 50 }) pageSize: number,
    @Args('pageNumber', { type: () => Int, defaultValue: 1 })
    pageNumber: number,
  ) {
    return this.blogPostService.getAllBlogPosts(pageSize, pageNumber); // Issue is caused by the async return type. which is not required
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
    @Context() ctx: any,
    @Args('data') data: CreateBlogPostInput,
  ) {
    // const userId = Number(ctx.user.sub);
    return this.blogPostService.createBlogPost(data);
  }

  @Mutation(() => BlogPost)
  async updateBlogPost(@Args('data') data: UpdateBlogPostInput) {
    return this.blogPostService.updateBlogPost(data.id, data);
  }

  @Mutation(() => BlogPost)
  async deleteBlogPost(@Args('id') id: number) {
    return this.blogPostService.deleteBlogPost(id);
  }
}
