import { UpdateBlogPostInput } from './dtos/update-blog.input';
import { Injectable } from '@nestjs/common';
// import { HostelData } from '@src/models/global.model';
import { generateSlug } from '@src/helpers/generateSlug';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBlogPostInput } from './dtos/create-blog.input';
import { BlogStatus, BlogTags } from '@prisma/client';
import { BlogPost } from '@src/models/global.model';
@Injectable()
export class BlogPostService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllBlogPosts(
    pageSize: number,
    pageNumber: number,
    blogTags: BlogTags[],
  ) {
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;
    // superadmin should get all verified/non verified hostels but other should get only verified
    const blogPosts = await this.prisma.blogPost.findMany({
      // also it should be published only
      where: {
        status: BlogStatus.PUBLISHED,
        tags: {
          hasSome: blogTags,
        },
      },
      skip,
      take,
    });

    return {
      data: blogPosts,
      error: null,
    };
  }

  async getBlogPostById(blogPostId: number) {
    const blogPost = await this.prisma.blogPost.findUnique({
      where: { id: blogPostId },
    });
    return {
      data: blogPost,
      error: null,
    };
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const blogPost = await this.prisma.blogPost.findUnique({
      where: { slug },
    });

    return {
      data: blogPost,
      error: null,
    };
  }

  async createBlogPost(data: CreateBlogPostInput) {
    const blogPost = await this.prisma.blogPost.create({
      data: {
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        coverImageUrl: data.coverImageUrl,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        metaKeywords: data.metaKeywords,
        status: data.status,
        views: data.views || 0,
        publishedAt: data.publishedAt,
        tags: data.tags as unknown as BlogTags[],
        slug: data.slug || generateSlug(data.title),
        authorId: data.authorId,
      },
    });
    return {
      data: blogPost,
      error: null,
    };
  }

  async updateBlogPost(blogPostId: number, data: UpdateBlogPostInput) {
    const res = await this.prisma.blogPost.update({
      where: { id: blogPostId },
      data: {
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        coverImageUrl: data.coverImageUrl,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        metaKeywords: data.metaKeywords,
        status: data.status,
        views: data.views,
        publishedAt: data.publishedAt,
        tags: data.tags as unknown as BlogTags[],
        slug: data.slug,
      },
    });
    return {
      data: res,
      error: null,
    };
  }

  async deleteBlogPost(blogPostId: number) {
    const res = await this.prisma.blogPost.delete({
      where: { id: blogPostId },
    });
    return {
      data: res,
      error: null,
    };
  }
}
