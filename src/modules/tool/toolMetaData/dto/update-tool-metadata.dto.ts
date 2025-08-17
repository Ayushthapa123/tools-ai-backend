import { InputType, Field } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { CreateToolMetaDataDto } from './create-tool-metadata.dto';

@InputType()
export class UpdateToolMetaDataDto extends PartialType(CreateToolMetaDataDto) {
  @Field()
  id: number;
}
