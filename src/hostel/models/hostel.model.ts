import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Address,
  ContactDetails,
  Gallery,
  HostelSuppliers,
  Orders,
  Payments,
  RoomAvailability,
  Socials,
} from '@src/models/global.model';

@ObjectType()
export class User {
  @Field(() => ID)
  userId: number;

  @Field()
  email: string;
  @Field()
  fullName: string;
}

@ObjectType()
export class Hostel {
  @Field(() => ID)
  hostelId: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field(() => Int)
  verified: boolean;

  @Field()
  genderType: string;

  @Field(() => Int, { nullable: true })
  capacity?: number;

  @Field({ nullable: true })
  description?: string;

  @Field()
  slug: string;

  @Field({ nullable: true })
  whatsappId?: string;

  @Field({ nullable: true })
  telegramId?: string;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  addressId: number;

  @Field(() => Int)
  contactId: number;

  @Field(() => Int, { nullable: true })
  roomAvailabilityId?: number;

  @Field(() => Int, { nullable: true })
  pricingId?: number;

  @Field(() => Int, { nullable: true })
  socialsId?: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => User)
  owner?: User;

  @Field(() => RoomAvailability, { nullable: true })
  roomAvailability?: RoomAvailability;

  //   @Field(() => Pricing, { nullable: true })
  //   pricing?: Pricing;

  @Field(() => Socials, { nullable: true })
  socials?: Socials;

  @Field(() => Address)
  address?: Address;

  @Field(() => ContactDetails)
  contact?: ContactDetails;

  @Field(() => [Orders])
  orders?: Orders[];

  @Field(() => [Payments])
  payments?: Payments[];

  @Field(() => [Gallery])
  gallery?: Gallery[];

  @Field(() => [HostelSuppliers])
  suppliers?: HostelSuppliers[];
}
