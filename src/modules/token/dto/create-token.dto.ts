import { Field, InputType, Int } from '@nestjs/graphql';
// import GraphQLJSON from 'graphql-type-json';

@InputType()
export class CreateToken {
  @Field({ nullable: true })
  gemenaiToken?: string;

  @Field({ nullable: true })
  gptToken?: string;

  @Field(() => Int)
  userId: number;
}
