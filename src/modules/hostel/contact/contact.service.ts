import { UpdateContactInput } from './dtos/update-contact.input';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateContactInput } from './dtos/create-contact.input';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async getContactsByHomestayId(homestayId: number) {
    const contact = await this.prisma.contactDetails.findUnique({
      where: { homestayId: homestayId },
    });
    if (!contact) {
      return {
        data: null,
        error: {
          message: 'Contact not found',
        },
      };
    }
    return {
      data: contact,
      error: null,
    };
  }

  async createContacts(data: CreateContactInput) {
    const contact = await this.prisma.contactDetails.create({ data });
    return {
      data: contact,
      error: null,
    };
  }

  async updateContacts(contactId: number, data: UpdateContactInput) {
    const contact = await this.prisma.contactDetails.update({
      where: { id: contactId },
      data,
    });
    return {
      data: contact,
      error: null,
    };
  }

  async deleteContacts(contactId: number) {
    const contact = await this.prisma.contactDetails.delete({
      where: { id: contactId },
    });
    return {
      data: contact,
      error: null,
    };
  }
}
