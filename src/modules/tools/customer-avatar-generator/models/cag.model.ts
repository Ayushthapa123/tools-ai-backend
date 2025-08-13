import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResponse } from '@src/models/global.model';

@ObjectType()
export class CAGData {
  @Field(() => String)
  category: string; // Demographics//Firmographics//Behavior//Pain Points// Goals & Motivations//Psychographics//Messaging

  @Field(() => [String])
  items: string[];
}

@ObjectType()
export class CAG extends BaseResponse {
  @Field(() => CAGData, { nullable: true })
  data?: CAGData;
}

@ObjectType()
export class CAGList extends BaseResponse {
  @Field(() => [CAGData], { nullable: true })
  data?: CAGData[];

  @Field(() => String, { nullable: true })
  personalizedCustomerAvatar?: string;
}
