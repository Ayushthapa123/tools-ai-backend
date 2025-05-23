import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SearchHostelInput {
  @Field()
  pageNumber: number;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  subCity?: string;

  @Field({ nullable: true })
  minRating?: number;

  @Field({ nullable: true }) //fot the price to check People must select the "Seater"
  maxPrice?: number;

  @Field({ nullable: true })
  checkInDate?: Date;

  @Field({ nullable: true })
  checkOutDate?: Date;

  @Field({ nullable: true })
  latitude?: number;

  @Field({ nullable: true })
  longitude?: number;
}
