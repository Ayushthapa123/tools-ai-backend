import { UpdateBlogPostInput } from './dtos/update-blog.input';
import { Injectable } from '@nestjs/common';
// import { HostelData } from '@src/models/global.model';
import { generateSlug } from '@src/helpers/generateSlug';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBlogPostInput } from './dtos/create-blog.input';
import { BlogStatus, BlogTags } from '@prisma/client';
import { BlogPost, BlogPostList } from '@src/models/global.model';
@Injectable()
export class BlogPostService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllBlogPosts(
    pageSize: number,
    pageNumber: number,
    blogTags: BlogTags[],
    blogStatus?: BlogStatus,
  ): Promise<BlogPostList> {
    // superadmin should get all verified/non verified hostels but other should get only verified
    const [blogPosts, total] = await this.prisma.$transaction([
      this.prisma.blogPost.findMany({
        where: {
          ...(blogStatus && { status: blogStatus }),
          ...(blogTags.length > 0 && { tags: { hasSome: blogTags } }),
        },
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),

      this.prisma.blogPost.count({
        where: {
          ...(blogStatus && { status: blogStatus }),
          ...(blogTags.length > 0 && { tags: { hasSome: blogTags } }),
        },
      }),
    ]);

    return {
      data: blogPosts,
      error: null,
      pagination: {
        total: total,
        page: pageNumber,
        limit: pageSize,
        hasNextPage: pageNumber < Math.ceil(total / pageSize),
        hasPreviousPage: pageNumber > 1,
        totalPages: Math.ceil(total / pageSize),
      },
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

    console.log('blogPost', blogPost);

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
        oneLiner: data.oneLiner,
        videoUrl: data.videoUrl,
      },
    });
    return {
      data: blogPost,
      error: null,
    };
  }

  async updateBlogPost(blogPostId: number, data: UpdateBlogPostInput) {
    console.log('ddddd', data);
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
        oneLiner: data.oneLiner,
        videoUrl: data.videoUrl,
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
