import { InputType, Field } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { CreateInputSchemaDto } from './create-input-schema.dto';

@InputType()
export class UpdateInputSchemaDto extends PartialType(CreateInputSchemaDto) {
  @Field()
  id: number;
}
