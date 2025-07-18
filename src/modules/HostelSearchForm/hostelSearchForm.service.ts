import { UpdateHostelSearchFormInput } from './dtos/update-hostel-search-form.input';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateHostelSearchFormInput } from './dtos/hostel-search-form.input';
import * as bcrypt from 'bcrypt';
import { UserType } from '@prisma/client';
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
      include: {
        address: true,
      },
    });

    return {
      data: hostelSearchForms,
      error: null,
    };
  }

  async getHostelSearchFormByUserId(
    pageSize: number,
    pageNumber: number,
    userId: number,
  ) {
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;
    // superadmin should get all verified/non verified hostels but other should get only verified
    const hostelSearchForms = await this.prisma.hostelSearchForm.findMany({
      where: {
        userId,
      },
      skip,
      take,
      include: {
        address: true,
      },
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
    const { address, password, ...rest } = data;
    // if user is not present, create a new user
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    let newUser;
    if (!user) {
      const passwordHash = await bcrypt.hash(
        password || Math.random().toString(36).substring(2, 15),
        10,
      );

      newUser = await this.prisma.user.create({
        data: {
          email: data.email,
          passwordHash: passwordHash,
          fullName: data.fullName,
          userType: UserType.STUDENT,
        },
      });
    }

    const hostelSearchForm = await this.prisma.hostelSearchForm.create({
      data: {
        ...rest,
        userId: user?.id || newUser?.id,
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
