import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateHostelApplicationFormInput } from './hostel-application-form.input';

@InputType()
export class UpdateHostelApplicationFormInput extends PartialType(
  CreateHostelApplicationFormInput,
) {
  @Field(() => Int)
  id: number;
}
