import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateListedAiToolInput } from './create-listed-ai-tool.input';

@InputType()
export class UpdateListedAiToolInput extends PartialType(
  CreateListedAiToolInput,
) {
  @Field(() => Int)
  id: number;
}
