import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateHostelSellFormInput } from './hostel-sell-form.input';

@InputType()
export class UpdateHostelSellFormInput extends PartialType(
  CreateHostelSellFormInput,
) {
  @Field(() => Int)
  id: number;
}
