import { InputType, Field } from '@nestjs/graphql';
import { HostelGenderType, HostelType } from '@prisma/client';
import {
  ContactDetailData,
  AddressData,
  GalleryData,
} from '@src/models/global.model';

@InputType()
export class CreateHostelInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  hostelType?: HostelType;

  @Field({ nullable: true })
  genderType?: HostelGenderType;
}

@InputType()
export class CreateOnboardingHostelInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  hostelType?: HostelType;

  @Field({ nullable: true })
  genderType?: HostelGenderType;

  @Field({ nullable: true })
  isCreatedFromDashboard?: boolean;

  @Field({ nullable: true })
  hasOnboardingComplete?: boolean;

  @Field({ nullable: true })
  isVerifiedBySuperAdmin?: boolean;

  @Field({ nullable: true })
  contact?: ContactDetailData;

  @Field({ nullable: true })
  address?: AddressData;

  @Field({ nullable: true })
  gallery?: GalleryData;

  @Field({ nullable: true })
  amenity?: string;
}
