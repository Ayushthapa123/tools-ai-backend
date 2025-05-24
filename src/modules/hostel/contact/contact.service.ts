import { UpdateContactInput } from './dtos/update-contact.input';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateContactInput } from './dtos/create-contact.input';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async getContactsByHostelId(hostelId: number) {
    const contact = await this.prisma.contactDetail.findUnique({
      where: { hostelId: hostelId },
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
    const contact = await this.prisma.contactDetail.create({ data });
    return {
      data: contact,
      error: null,
    };
  }

  async updateContacts(contactId: number, data: UpdateContactInput) {
    const contact = await this.prisma.contactDetail.update({
      where: { id: contactId },
      data,
    });
    return {
      data: contact,
      error: null,
    };
  }

  async deleteContacts(contactId: number) {
    const contact = await this.prisma.contactDetail.delete({
      where: { id: contactId },
    });
    return {
      data: contact,
      error: null,
    };
  }
}
