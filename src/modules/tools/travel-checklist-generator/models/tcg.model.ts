import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResponse } from '@src/models/global.model';

@ObjectType()
export class TCGData {
  @Field(() => String)
  category: string; // Documents//Money & Payments //Clothing//Health & Safety//Daily Use// Snacks And Hydration// Tools & Electronics/Other Recommendations// Must Have Rechecks(Reminders)//Don't Include

  @Field(() => [String])
  items: string[];
}

@ObjectType()
export class TCG extends BaseResponse {
  @Field(() => TCGData, { nullable: true })
  data?: TCGData;
}

@ObjectType()
export class TCGList extends BaseResponse {
  @Field(() => [TCGData], { nullable: true })
  data?: TCGData[];

  @Field(() => String, { nullable: true })
  personalizedTravelGuide?: string;
}
