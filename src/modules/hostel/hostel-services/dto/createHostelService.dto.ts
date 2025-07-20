import { Field, InputType, Int } from "@nestjs/graphql";
import { HostelServiceType, Priority, Status } from "@src/models/global.enum";

@InputType()
export class CreateHostelServiceDto {
  @Field(() => HostelServiceType)
  hostelServiceType: HostelServiceType;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Number, { nullable: true })
  budget?: number;

  @Field(() => Priority)
  priority: Priority;

  @Field(() => Date, { nullable: true })
  dueDate?: Date;

  @Field(() => Date, { nullable: true })
  completionDate?: Date;

  @Field(() => Status)
  status: Status;
  
  @Field(() => Int)
  hostelId: number;
}