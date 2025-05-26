import { InputType, Field } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create-service.dto';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  @Field()
  id: number;

  @Field(() => GraphQLJSON)
  services: any;

  @Field()
  hostelId: number;
}
