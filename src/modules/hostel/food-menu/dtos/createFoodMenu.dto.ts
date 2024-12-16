import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { WeekDays } from '@prisma/client';

registerEnumType(WeekDays,{
    name:"WeekDays",
})

@InputType()
export class CreateFoodMenu {
  @Field(() => String)
  day: WeekDays;

  @Field()
  lunch: string;
 
  @Field()
  dinner: string;

  @Field()
  snacks: string;

  @Field()
  lunchTime: string;

  @Field()
  dinnerTime: string;

  @Field()
  snacksTime: string;
}
