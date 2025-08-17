import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateToolInput } from './create-tool.input';

@InputType()
@InputType()
export class UpdateToolInput extends PartialType(CreateToolInput) {
  @Field(() => Int)
  id: number;
}
