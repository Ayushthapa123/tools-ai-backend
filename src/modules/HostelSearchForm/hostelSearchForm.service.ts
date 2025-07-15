import { UpdateHostelSearchFormInput } from './dtos/update-hostel-search-form.input';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateHostelSearchFormInput } from './dtos/hostel-search-form.input';

@Injectable()
export class HostelSearchFormService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllHostelSearchForms(pageSize: number, pageNumber: number) {
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;
    // superadmin should get all verified/non verified hostels but other should get only verified
    const hostelSearchForms = await this.prisma.hostelSearchForm.findMany({
      skip,
      take,
    });

    return {
      data: hostelSearchForms,
      error: null,
    };
  }

  async getHostelSearchFormById(hostelSearchFormId: number) {
    const hostelSearchForm = await this.prisma.hostelSearchForm.findUnique({
      where: { id: hostelSearchFormId },
    });
    return {
      data: hostelSearchForm,
      error: null,
    };
  }

  async createHostelSearchForm(data: CreateHostelSearchFormInput) {
    const { address, ...rest } = data;
    const hostelSearchForm = await this.prisma.hostelSearchForm.create({
      data: {
        ...rest,
        address: {
          create: {
            ...address,

            country: address.country,
            city: address.city,
            subCity: address.subCity,
            street: address.street,
            latitude: address.latitude,
            longitude: address.longitude,
          },
        },
      },
    });
    return {
      data: hostelSearchForm,
      error: null,
    };
  }

  async updateHostelSearchForm(data: UpdateHostelSearchFormInput) {
    const res = await this.prisma.hostelSearchForm.update({
      where: { id: data.id },
      data: {
        ...data,
        address: {
          update: {
            ...data.address,
          },
        },
      },
    });
    return {
      data: res,
      error: null,
    };
  }

  async deleteHostelSearchForm(hostelSearchFormId: number) {
    const res = await this.prisma.hostelSearchForm.delete({
      where: { id: hostelSearchFormId },
    });
    return {
      data: res,
      error: null,
    };
  }
}
