import { Field, InputType } from '@nestjs/graphql';
// import GraphQLJSON from 'graphql-type-json';

@InputType()
export class CreateInputSchema {
  @Field()
  schema: string;

  @Field()
  toolId: number;
}
