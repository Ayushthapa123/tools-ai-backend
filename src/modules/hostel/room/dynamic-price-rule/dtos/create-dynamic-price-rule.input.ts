import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateDynamicPriceRuleInput {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Int)
  roomId: number;

  @Field(() => Date)
  startDate: Date;

  @Field(() => Date)
  endDate: Date;

  @Field(() => Int)
  amount: number;

  @Field(() => Boolean, { defaultValue: false })
  isWeekend: boolean;

  @Field(() => Boolean, { defaultValue: true })
  isActive: boolean;

  @Field(() => Int, { defaultValue: 0 })
  priority: number;
}
