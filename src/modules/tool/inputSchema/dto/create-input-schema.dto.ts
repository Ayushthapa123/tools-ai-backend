import { Field, InputType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class CreateInputSchemaDto {
  @Field(() => GraphQLJSON)
  schema: any;

  @Field()
  toolId: number;
}
