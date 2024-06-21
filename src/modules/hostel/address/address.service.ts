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
    //check whether a searchQueries already have address
    const searchCity = await this.prisma.searchQueries.findFirst({
      where: { city: data.city, country: data.country },
    });
    if (!searchCity) {
      //create searchquery with just country and city
      await this.prisma.searchQueries.create({
        data: { country: data.country, city: data.city },
      });
    }
    const searchSubCity = await this.prisma.searchQueries.findFirst({
      where: { subCity: data.subCity, city: data.city, country: data.country },
    });
    if (!searchSubCity && data.subCity) {
      //create searchquery with country and city subcity
      await this.prisma.searchQueries.create({
        data: { country: data.country, city: data.city, subCity: data.subCity },
      });
    }

    return this.prisma.address.create({ data });
  }

  async updateAddress(addressId: number, data: UpdateAddressInput) {
    //check whether a searchQueries already have address
    const searchCity = await this.prisma.searchQueries.findFirst({
      where: { city: data.city, country: data.country },
    });
    if (!searchCity) {
      //create searchquery with just country and city
      await this.prisma.searchQueries.create({
        data: { country: data.country, city: data.city },
      });
    }
    const searchSubCity = await this.prisma.searchQueries.findFirst({
      where: { subCity: data.subCity, city: data.city, country: data.country },
    });
    if (!searchSubCity && data.subCity) {
      //create searchquery with country and city subcity
      await this.prisma.searchQueries.create({
        data: { country: data.country, city: data.city, subCity: data.subCity },
      });
    }
    return this.prisma.address.update({ where: { addressId }, data });
  }

  async deleteAddress(addressId: number) {
    return this.prisma.address.delete({ where: { addressId } });
  }
}
