import { InputType, Field, Int } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class CreateRulesInput {
  @Field(() => Int)
  hostelId: number;

  @Field(() => GraphQLJSON)
  rules: any; // JSON string
}
