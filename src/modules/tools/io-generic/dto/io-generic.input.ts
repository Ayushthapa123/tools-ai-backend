// forgot-password.input.ts
import { InputType, Field } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class IOGenericInput {
  @Field(() => GraphQLJSON)
  schema: any;
  @Field(() => GraphQLJSON)
  data: any;
}
