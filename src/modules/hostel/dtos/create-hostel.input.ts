import { InputType, Field } from '@nestjs/graphql';
import { HostelGenderType, HostelType } from '@prisma/client';
import { CreateContactInput } from '../contact/dtos/create-contact.input';
import { CreateAddressInput } from '../address/dtos/create-address.input';
import { CreateGalleryInput } from '../gallery/dto/create-gallery.dto';
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

  @Field({ nullable: true })
  admissionFee?: number;

  @Field({ nullable: true })
  depositAmount?: number;
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
  admissionFee?: number;

  @Field({ nullable: true })
  depositAmount?: number;

  @Field({ nullable: true })
  isCreatedFromDashboard?: boolean;

  @Field({ nullable: true })
  hasOnboardingComplete?: boolean;

  @Field({ nullable: true })
  isVerifiedBySuperAdmin?: boolean;

  @Field({ nullable: true })
  contact?: CreateContactInput; // here exclude hosetelId

  @Field({ nullable: true })
  address?: CreateAddressInput;

  @Field({ nullable: true })
  gallery?: CreateGalleryInput;

  @Field({ nullable: true })
  amenity?: string;
}
