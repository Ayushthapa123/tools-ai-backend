import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResponse } from '@src/models/global.model';

@ObjectType()
export class DomainItem {
  @Field(() => String)
  item: string;
  @Field(() => Boolean)
  available: boolean;
  @Field(() => Number, { nullable: true })
  price?: number;
}

@ObjectType()
export class DNGData {
  @Field(() => String)
  category: string; // unique,seo_friendly, brandable, descriptive,

  @Field(() => [DomainItem])
  items: DomainItem[];
}

@ObjectType()
export class DNG extends BaseResponse {
  @Field(() => DNGData, { nullable: true })
  data?: DNGData;
}

@ObjectType()
export class DNGList extends BaseResponse {
  @Field(() => [DNGData], { nullable: true })
  data?: DNGData[];

  @Field(() => String, { nullable: true })
  personalizedGuide?: string;

  @Field(() => Boolean, { nullable: true })
  success?: boolean;

  @Field(() => String, { nullable: true })
  message?: string;
}
