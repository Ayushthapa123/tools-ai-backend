import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { WeekDays } from '@prisma/client';

registerEnumType(WeekDays,{
    name:"WeekDays",
})

@InputType()
export class CreateFoodMenu {
  @Field(() => String,{nullable:true})
  day?: WeekDays;

  @Field({nullable:true})
  lunch?: string;
 
  @Field({nullable:true})
  dinner?: string;

  @Field({nullable:true})
  snacks?: string;

  @Field({nullable:true})
  lunchTime?: string;

  @Field({nullable:true})
  dinnerTime?: string;

  @Field({nullable:true})
  snacksTime?: string;

  @Field({nullable:true,defaultValue:1})
  hostelId?: number;
}
