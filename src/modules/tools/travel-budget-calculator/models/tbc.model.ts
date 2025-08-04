import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseResponse } from '@src/models/global.model';

@ObjectType()
export class TbcData {
  @Field(() => String)
  category: string;

  @Field(() => Int)
  cost: number;

  @Field(() => String)
  currency: string;

  @Field(() => String)
  shortGuide: string;

  @Field(() => String)
  per: string;
}

@ObjectType()
export class TBC extends BaseResponse {
  @Field(() => TbcData, { nullable: true })
  data?: TbcData;
}

@ObjectType()
export class TBCList extends BaseResponse {
  @Field(() => [TbcData], { nullable: true })
  data?: TbcData[];
  @Field(() => String, { nullable: true })
  personalizedTravelGuide?: string;
}
