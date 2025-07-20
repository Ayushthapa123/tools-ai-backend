import { UpdateHostelSellFormInput } from './dtos/update-hostel-sell-form.input';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateHostelSellFormInput } from './dtos/hostel-sell-form.input';
import { AddressType } from '@prisma/client';
@Injectable()
export class HostelSellFormService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllHostelSellForms(pageSize: number, pageNumber: number) {
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;
    // superadmin should get all verified/non verified hostels but other should get only verified
    const hostelSellForms = await this.prisma.hostelSellForm.findMany({
      skip,
      take,
      include: {
        address: true,
      },
    });

    return {
      data: hostelSellForms,
      error: null,
    };
  }

  async getHostelSellFormById(hostelSellFormId: number) {
    const hostelSellForm = await this.prisma.hostelSellForm.findUnique({
      where: { id: hostelSellFormId },
      include: {
        address: true,
      },
    });
    return {
      data: hostelSellForm,
      error: null,
    };
  }

  async createHostelSellForm(data: CreateHostelSellFormInput) {
    const { address, ...rest } = data;
    // if user is not present, create a new user
    console.log('ddddddddddd', data);

    const hostelSellForm = await this.prisma.hostelSellForm.create({
      data: {
        ...rest,
      },
    });
    // create a generic address
    const genericAddress = await this.prisma.genericAddress.create({
      data: {
        ...address,
        addressType: AddressType.HOSTEL_SELL_FORM,
      },
    });
    // also update the hostelSearchForm with add
    await this.prisma.hostelSellForm.update({
      where: { id: hostelSellForm.id },
      data: {
        addressId: genericAddress.id,
      },
    });

    return {
      data: hostelSellForm,
      error: null,
    };
  }

  async updateHostelSellForm(data: UpdateHostelSellFormInput) {
    console.log('ddddddddddd', data);
    // fix the logic later

    // // check if address is present
    // if (address) {
    //   // Update the address first
    //   await this.prisma.genericAddress.update({
    //     where: { id: address. },
    //     data: {
    //       country: address.country,
    //       city: address.city,
    //       subCity: address.subCity,
    //       street: address.street,
    //       latitude: address.latitude,
    //       longitude: address.longitude,
    //     },
    //   });
    // }

    // // Update the HostelSellForm (excluding address)
    // const res = await this.prisma.hostelSellForm.update({
    //   where: { id },
    //   data: {
    //     ...rest,
    //     // addressId, // in case it is being changed, though usually not
    //   },
    // });
    // return {
    //   data: res,
    //   error: null,
    // };
  }

  async deleteHostelSellForm(hostelSellFormId: number) {
    const res = await this.prisma.hostelSellForm.delete({
      where: { id: hostelSellFormId },
    });
    return {
      data: res,
      error: null,
    };
  }
}
