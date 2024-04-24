import { UpdateHostelInput } from './dtos/update-hostel.input';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHostelInput } from './dtos/create-hostel.input';
import { Hostel } from './models/hostel.model';

@Injectable()
export class HostelService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllHostels(pageSize: number, pageNumber: number) {
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;
    return this.prisma.hostel.findMany({
      skip,
      take,
      include: {
        owner: {
          select: {
            userId: true,
            email: true,
            fullName: true,
          },
        },
      },
    });
  }

  async getHostelById(hostelId: number): Promise<Hostel | null> {
    return this.prisma.hostel.findUnique({
      where: { hostelId },
      include: {
        owner: {
          select: {
            // Specify the fields you want from the Users model
            userId: true,
            email: true,
            fullName: true,

            // Add other fields you need
          },
        },
      },
    });
  }

  async createHostel(data: CreateHostelInput) {
    return this.prisma.hostel.create({ data });
  }

  async updateHostel(hostelId: number, data: UpdateHostelInput) {
    return this.prisma.hostel.update({ where: { hostelId }, data });
  }

  async deleteHostel(hostelId: number) {
    return this.prisma.hostel.delete({ where: { hostelId } });
  }
}
