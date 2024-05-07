import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GoogleOauthUrl {
  @Field()
  url: string;
}
