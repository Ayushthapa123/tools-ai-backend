import { Address } from '../../../models/global.model';
import { UpdateAddressInput } from './dtos/update-address.input';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateAddressInput } from './dtos/create-address.input';

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaService) {}

  async getAddressByHostelId(hostelId: number): Promise<Address | null> {
    return this.prisma.address.findUnique({
      where: { hostelId },
    });
  }

  async createAddress(data: CreateAddressInput) {
    return this.prisma.address.create({ data });
  }

  async updateAddress(addressId: number, data: UpdateAddressInput) {
    return this.prisma.address.update({ where: { addressId }, data });
  }

  async deleteAddress(addressId: number) {
    return this.prisma.address.delete({ where: { addressId } });
  }
}
