import { InputType, Field, Int } from '@nestjs/graphql';
import { Currency, DiscountType } from '@src/models/global.enum';

@InputType()
export class CreatePriceInput {
  @Field(() => Int, { nullable: true })
  baseAmountPerDay?: number;

  @Field(() => Int)
  baseAmountPerMonth: number;

  @Field(() => Currency)
  currency: Currency;

  @Field(() => Int)
  roomId: number;

  @Field(() => Boolean, { defaultValue: false })
  isDynamicPricing?: boolean;

  // @Field(() => Int, { nullable: true })
  // dynamicAmount?: number;

  // @Field(() => Date, { nullable: true })
  // dynamicPriceStart?: Date;

  // @Field(() => Date, { nullable: true })
  // dynamicPriceEnd?: Date;

  // @Field(() => Boolean, { defaultValue: false })
  // isWeekend?: boolean;

  @Field(() => Int, { nullable: true })
  discountAmount?: number;

  @Field(() => DiscountType, { nullable: true })
  discountType?: DiscountType;

  @Field(() => Boolean, { defaultValue: false })
  isDiscountActive?: boolean;
}
