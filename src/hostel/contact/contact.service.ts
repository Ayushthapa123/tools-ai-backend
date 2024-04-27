import { ContactDetails } from './../../models/global.model';
import { UpdateContactInput } from './dtos/update-contact.input';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateContactInput } from './dtos/create-contact.input';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async getContactsByHostelId(
    hostelId: number,
  ): Promise<ContactDetails | null> {
    return this.prisma.contactDetails.findUnique({
      where: { hostelId },
    });
  }

  async createContacts(data: CreateContactInput) {
    return this.prisma.contactDetails.create({ data });
  }

  async updateContacts(contactId: number, data: UpdateContactInput) {
    return this.prisma.contactDetails.update({ where: { contactId }, data });
  }

  async deleteContacts(contactId: number) {
    return this.prisma.contactDetails.delete({ where: { contactId } });
  }
}
