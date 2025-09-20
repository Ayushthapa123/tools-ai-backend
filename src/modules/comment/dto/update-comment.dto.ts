import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateComment } from './create-comment.dto';
// import GraphQLJSON from 'graphql-type-json';

@InputType()
export class UpdateComment extends PartialType(CreateComment) {
  @Field()
  id: number;
}
