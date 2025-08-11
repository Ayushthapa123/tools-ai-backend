import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResponse } from '@src/models/global.model';

@ObjectType()
export class TDFData {
  @Field(() => String)
  destinationCountry: string;

  @Field(() => String)
  destinationPlace: string;

  @Field(() => [String])
  activitiesToDo: string[];

  @Field(() => String)
  expectedCost: string; // Currently return in range //it can be an aray of object with detailed costing with activities

  @Field(() => String)
  shortGuide: string;
}

@ObjectType()
export class TDF extends BaseResponse {
  @Field(() => TDFData, { nullable: true })
  data?: TDFData;
}

@ObjectType()
export class TDFList extends BaseResponse {
  @Field(() => [TDFData], { nullable: true })
  data?: TDFData[];
  @Field(() => String, { nullable: true })
  personalizedTravelGuide?: string;
}
