import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UploadImageModel {
  @Field(() => String)
  url: string;
}

@ObjectType()
export class DeleteImageModel {
  @Field(() => Boolean)
  response: boolean;
}
