import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateInputSchema } from './create-input-schema.dto';
// import GraphQLJSON from 'graphql-type-json';

@InputType()
export class UpdateInputSchema extends PartialType(CreateInputSchema) {
  @Field()
  id: number;

  @Field()
  schema: string;
}
