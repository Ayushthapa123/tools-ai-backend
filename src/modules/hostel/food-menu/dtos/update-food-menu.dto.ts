import { Field, InputType } from "@nestjs/graphql";
import { WeekDays } from "@prisma/client";

@InputType()
export class UpdateFoodMenu{
    @Field(()=>WeekDays,{nullable:true})
    day?:WeekDays

    @Field({nullable:true})
    lunch?:string

    @Field({nullable:true})
    dinner?:string

    @Field({nullable:true})
    snacks?:string

    @Field({nullable:true})
    lunchTime?:string

    @Field({nullable:true})
    dinnerTime?:string

    @Field({nullable:true})
    snacksTime?:string

}