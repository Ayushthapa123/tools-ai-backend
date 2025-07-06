import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateBlogPostInput } from './create-blog.input';

@InputType()
export class UpdateBlogPostInput extends PartialType(CreateBlogPostInput) {
  @Field(() => Int)
  id: number;
}
