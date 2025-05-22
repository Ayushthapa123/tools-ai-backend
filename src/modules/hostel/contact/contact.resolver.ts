import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ContactService } from './contact.service';
import { ContactDetails } from '@src/models/global.model';
import { CreateContactInput } from './dtos/create-contact.input';
import { UpdateContactInput } from './dtos/update-contact.input';

// import { Controller } from '@nestjs/common';

@Resolver(() => ContactDetails)
export class ContactResolver {
  constructor(private readonly contactService: ContactService) {}

  @Query(() => ContactDetails, { nullable: true })
  async getContactByHomestayId(
    @Args('homestayId') homestayId: number,
  ): Promise<ContactDetails | null> {
    return this.contactService.getContactsByHomestayId(homestayId);
  }

  @Mutation(() => ContactDetails)
  async createContact(
    @Args('data') data: CreateContactInput,
  ): Promise<ContactDetails> {
    return this.contactService.createContacts(data);
  }

  @Mutation(() => ContactDetails)
  async updateContact(
    @Args('contactId') contactId: number,
    @Args('data') data: UpdateContactInput,
  ): Promise<ContactDetails> {
    return this.contactService.updateContacts(contactId, data);
  }
}
