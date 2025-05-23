import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ContactService } from './contact.service';
import { ContactDetail } from '@src/models/global.model';
import { CreateContactInput } from './dtos/create-contact.input';
import { UpdateContactInput } from './dtos/update-contact.input';

// import { Controller } from '@nestjs/common';

@Resolver(() => ContactDetail)
export class ContactResolver {
  constructor(private readonly contactService: ContactService) {}

  @Query(() => ContactDetail, { nullable: true })
  async getContactByHomestayId(
    @Args('homestayId') homestayId: number,
  ): Promise<ContactDetail | null> {
    return this.contactService.getContactsByHomestayId(homestayId);
  }

  @Mutation(() => ContactDetail)
  async createContact(
    @Args('data') data: CreateContactInput,
  ): Promise<ContactDetail> {
    return this.contactService.createContacts(data);
  }

  @Mutation(() => ContactDetail)
  async updateContact(
    @Args('contactId') contactId: number,
    @Args('data') data: UpdateContactInput,
  ): Promise<ContactDetail> {
    return this.contactService.updateContacts(contactId, data);
  }
}
