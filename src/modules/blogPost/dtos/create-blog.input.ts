import { InputType, Field, Int } from '@nestjs/graphql';
import { BlogStatus, BlogTags } from '@prisma/client';

@InputType()
export class CreateBlogPostInput {
  @Field()
  title: string;

  @Field()
  slug: string;

  @Field({ nullable: true })
  excerpt?: string;
  @Field()
  content: string;

  @Field({ nullable: true })
  coverImageUrl?: string;

  @Field()
  metaTitle: string;

  @Field({ nullable: true })
  metaDescription?: string;

  @Field({ nullable: true })
  metaKeywords?: string;
  @Field(() => BlogStatus)
  status: BlogStatus;

  @Field({ nullable: true })
  views?: number;

  @Field({ nullable: true })
  publishedAt?: Date;
  @Field(() => [BlogTags])
  tags?: BlogTags[];

  @Field({ nullable: true })
  videoUrl?: string;

  @Field({ nullable: true })
  oneLiner?: string;

  @Field(() => Int)
  authorId: number;
}
