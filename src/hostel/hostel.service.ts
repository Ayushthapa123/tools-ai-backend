import { UpdateHostelInput } from './dtos/update-hostel.input';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHostelInput } from './dtos/create-hostel.input';
import { Hostel } from '@src/models/global.model';

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
    });
  }

  async getHostelBySlug(slug: string): Promise<Hostel | null> {
    return this.prisma.hostel.findUnique({
      where: { slug },
      // include: {
      //   owner: {
      //     select: {
      //       // Specify the fields you want from the Users model
      //       userId: true,
      //       email: true,
      //       fullName: true,

      //       // Add other fields you need
      //     },
      //   },
      // },
    });
  }

  async getHostelBytoken(userId: number) {
    try {
      const hostel = await this.prisma.hostel.findUnique({
        where: { userId: Number(userId) },
      });

      return hostel; // Return the decoded user ID
    } catch (error) {
      // Token verification failed
      throw new NotFoundException('token not found');
    }
  }

  async createHostel(userId: number, data: CreateHostelInput) {
    console.log('uuuuuuuuuuu', userId);
    const slug = data.name;
    return this.prisma.hostel.create({ data: { ...data, slug: slug, userId } });
  }

  async updateHostel(hostelId: number, data: UpdateHostelInput) {
    return this.prisma.hostel.update({ where: { hostelId }, data });
  }

  async deleteHostel(hostelId: number) {
    return this.prisma.hostel.delete({ where: { hostelId } });
  }
}
