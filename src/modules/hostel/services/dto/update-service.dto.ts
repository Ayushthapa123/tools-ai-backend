import { Field, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create-service.dto';

@InputType()
export class UpdateServiceDto {
  @Field()
  id: number;

  @Field()
  service: string;
}
