import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateServiceDto {
  @Field()
  service: string;

  @Field()
  homestayId: number;
}
