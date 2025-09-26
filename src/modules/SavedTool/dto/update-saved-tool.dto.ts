import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateSavedTool } from './create-saved-tool.dto';
// import GraphQLJSON from 'graphql-type-json';

@InputType()
export class UpdateSavedTool extends PartialType(CreateSavedTool) {
  @Field()
  id: number;
}
