import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateDynamicPriceRuleInput } from './create-dynamic-price-rule.input';

// make it with the help of create-dynamic-price-rule.input.ts also make it optional
@InputType()
export class UpdateDynamicPriceRuleInput extends PartialType(
  CreateDynamicPriceRuleInput,
) {
  @Field(() => Int)
  id: number;
}
