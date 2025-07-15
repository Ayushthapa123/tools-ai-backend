import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateHostelSearchFormInput } from './hostel-search-form.input';

@InputType()
export class UpdateHostelSearchFormInput extends PartialType(
  CreateHostelSearchFormInput,
) {
  @Field(() => Int)
  id: number;
}
