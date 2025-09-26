import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateSavedTool {
  @Field(() => Int)
  toolId: number;

  @Field(() => Int)
  userId: number;
}
