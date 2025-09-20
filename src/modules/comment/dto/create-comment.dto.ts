import { Field, InputType, Int } from '@nestjs/graphql';
import { ToolType } from '@src/models/global.enum';
// import GraphQLJSON from 'graphql-type-json';

@InputType()
export class CreateComment {
  @Field({ nullable: true })
  toolId?: number;

  @Field({ nullable: true })
  listedAiToolId?: number;

  @Field()
  toolType: ToolType;

  @Field(() => Int, { nullable: true })
  userId?: number;
  @Field(() => String)
  comment: string;
}
