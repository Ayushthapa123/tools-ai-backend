import { UpdateHostelApplicationFormInput } from './dtos/update-hostel-application-form.input';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateHostelApplicationFormInput } from './dtos/hostel-application-form.input';
import * as bcrypt from 'bcrypt';
import { UserType } from '@prisma/client';
@Injectable()
export class HostelApplicationFormService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllHostelApplicationForms(pageSize: number, pageNumber: number) {
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;
    // superadmin should get all verified/non verified hostels but other should get only verified
    const hostelApplicationForms =
      await this.prisma.hostelApplicationForm.findMany({
        skip,
        take,
      });

    return {
      data: hostelApplicationForms,
      error: null,
    };
  }
  async getAllHostelApplicationFormsByHostelId(
    pageSize: number,
    pageNumber: number,
    hostelId: number,
  ) {
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;
    // superadmin should get all verified/non verified hostels but other should get only verified
    const hostelApplicationForms =
      await this.prisma.hostelApplicationForm.findMany({
        where: {
          hostelId,
        },
        skip,
        take,
      });

    return {
      data: hostelApplicationForms,
      error: null,
    };
  }
  async getHostelApplicationFormByUserId(
    pageSize: number,
    pageNumber: number,
    userId: number,
  ) {
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;
    // superadmin should get all verified/non verified hostels but other should get only verified
    const hostelApplicationForms =
      await this.prisma.hostelApplicationForm.findMany({
        where: {
          userId,
        },
        include: {
          hostel: { include: { contact: true, address: true } },
        },
        skip,
        take,
      });

    return {
      data: hostelApplicationForms,
      error: null,
    };
  }

  async getHostelApplicationFormById(hostelApplicationFormId: number) {
    const hostelApplicationForm =
      await this.prisma.hostelApplicationForm.findUnique({
        where: { id: hostelApplicationFormId },
      });
    return {
      data: hostelApplicationForm,
      error: null,
    };
  }

  async createHostelApplicationForm(data: CreateHostelApplicationFormInput) {
    const { password, ...rest } = data;
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

    const hostelApplicationForm =
      await this.prisma.hostelApplicationForm.create({
        data: {
          ...rest,
          userId: user?.id || newUser?.id,
          hostelId: data.hostelId,
          email: data.email,
          fullName: data.fullName,
          occupation: data.occupation,
          institutionName: data.institutionName,
          permanentAddress: data.permanentAddress,
          roomCapacity: data.roomCapacity,
          askForDiscount: data.askForDiscount,
          discountPercentage: data.discountPercentage,
          notes: data.notes,
          status: data.status,
          checkinDate: data.checkinDate,
          checkoutDate: data.checkoutDate,
          phoneNumber: data.phoneNumber,
        },
      });
    return {
      data: hostelApplicationForm,
      error: null,
    };
  }

  async updateHostelApplicationForm(data: UpdateHostelApplicationFormInput) {
    const res = await this.prisma.hostelApplicationForm.update({
      where: { id: data.id },
      data: {
        ...data,
      },
    });
    return {
      data: res,
      error: null,
    };
  }

  async deleteHostelApplicationForm(hostelApplicationFormId: number) {
    const res = await this.prisma.hostelApplicationForm.delete({
      where: { id: hostelApplicationFormId },
    });
    return {
      data: res,
      error: null,
    };
  }
}
