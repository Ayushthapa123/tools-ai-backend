import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateToken } from './create-token.dto';
// import GraphQLJSON from 'graphql-type-json';

@InputType()
export class UpdateToken extends PartialType(CreateToken) {
  @Field()
  id: number;
}
