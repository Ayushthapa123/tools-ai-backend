import { Field, InputType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class CreateServiceDto {
  @Field(() => GraphQLJSON)
  services: any;

  @Field()
  hostelId: number;
}
