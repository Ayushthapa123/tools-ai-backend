import { Module } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { BlogPostService } from './blogPost.service';
import { BlogPostResolver } from './blogPost.resolver';
@Module({
  imports: [],
  providers: [BlogPostResolver, BlogPostService, JwtService],
})
export class BlogPostModule {}
