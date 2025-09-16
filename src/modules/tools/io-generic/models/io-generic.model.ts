import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResponse } from '@src/models/global.model';

@ObjectType()
export class IOGenericData {
  @Field(() => String)
  htmlResponse: string;
}

@ObjectType()
export class IOGenericTextToImageData {
  @Field(() => String)
  lowResolutionImage: string;
  @Field(() => String)
  mediumResolutionImage: string;
  @Field(() => String)
  highResolutionImage: string;
}

@ObjectType()
export class IOGeneric extends BaseResponse {
  @Field(() => IOGenericData, { nullable: true })
  data?: IOGenericData;
}

@ObjectType()
export class IOGenericList extends BaseResponse {
  @Field(() => [IOGenericData], { nullable: true })
  data?: IOGenericData[];
  @Field(() => String, { nullable: true })
  personalizedGuide?: string;
}

@ObjectType()
export class IOGenericTextToImage extends BaseResponse {
  @Field(() => IOGenericTextToImageData, { nullable: true })
  data?: IOGenericTextToImageData;
}

@ObjectType()
export class IOGenericTextToImageList extends BaseResponse {
  @Field(() => [IOGenericTextToImageData], { nullable: true })
  data?: IOGenericTextToImageData[];
}
