import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { UpdateAddressInput } from './dtos/update-address.input';
import { CreateAddressInput } from './dtos/create-address.input';

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaService) {}

  async getAddressByHomestayId(homestayId: number) {
    const address = await this.prisma.address.findUnique({
      where: { homestayId: homestayId },
    });
    if (!address) {
      return {
        data: null,
        error: {
          message: 'Address not found',
        },
      };
    }
    return {
      data: address,
      error: null,
    };
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

    const address = await this.prisma.address.create({ data });
    return {
      data: address,
      error: null,
    };
  }

  async updateAddress(addressId: number, data: UpdateAddressInput) {
    //check whether a searchQueries already have address
    const searchCity = await this.prisma.searchQueries.findFirst({
      where: {
        city: {
          equals: data.city,
          mode: 'insensitive',
        },
        country: {
          equals: data.country,
          mode: 'insensitive',
        },
      },
    });

    if (!searchCity) {
      //create searchquery with just country and city
      await this.prisma.searchQueries.create({
        data: {
          country: data.country.toLowerCase(),
          city: data.city.toLowerCase(),
        },
      });
    }
    const searchSubCity = await this.prisma.searchQueries.findFirst({
      where: {
        subCity: data.subCity.toLowerCase(),
        city: data.city.toLowerCase(),
        country: data.country.toLowerCase(),
      },
    });
    if (!searchSubCity && data.subCity) {
      //create searchquery with country and city subcity
      await this.prisma.searchQueries.create({
        data: {
          country: data.country.toLowerCase(),
          city: data.city.toLowerCase(),
          subCity: data.subCity.toLowerCase(),
        },
      });
    }
    const address = await this.prisma.address.update({
      where: { id: addressId },
      data,
    });
    return {
      data: address,
      error: null,
    };
  }

  async deleteAddress(addressId: number) {
    const address = await this.prisma.address.delete({
      where: { id: addressId },
    });
    return {
      data: address,
      error: null,
    };
  }
}
