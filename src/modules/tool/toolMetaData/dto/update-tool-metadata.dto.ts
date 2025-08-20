import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateToolMetaDataDto } from './create-tool-metadata.dto';

@InputType()
export class UpdateToolMetaDataDto extends PartialType(CreateToolMetaDataDto) {
  @Field()
  id: number;
}
