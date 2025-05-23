import { InputType, Field } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create-service.dto';

@InputType()
export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  @Field()
  id: number;
}
