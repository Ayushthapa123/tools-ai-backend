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
  async getContactByHostelId(
    @Args('hostelId') hostelId: number,
  ): Promise<ContactDetail | null> {
    return this.contactService.getContactsByHostelId(hostelId);
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
    console.log('updating contact');
    return this.contactService.updateContacts(contactId, data);
  }
}
