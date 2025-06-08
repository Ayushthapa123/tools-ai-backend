import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateHostelGuestInput } from './create-hostel-guest.input';

@InputType()
export class UpdateHostelGuestInput extends PartialType(
  CreateHostelGuestInput,
) {
  @Field(() => Int)
  id: number;
}
