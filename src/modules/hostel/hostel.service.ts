import { UpdateHostelInput } from './dtos/update-hostel.input';
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Hostel } from '@src/models/global.model';
import { generateSlug } from '@src/helpers/generateSlug';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateHostelInput } from './dtos/create-hostel.input';

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
        address: true,
        roomAvailability: true,
        monthlyPricing: true,
        gallery: { where: { type: 'COVER' } },
      },
      where: {
        gallery: {
          some: { type: 'COVER' },
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
      include: {
        address: true,
        contact: true,
        dailyPricing: true,
        monthlyPricing: true,
        roomAvailability: true,
        gallery: true,
        nearbyPlaces: true,
        socials: true,
        amenities: true,
        hostelRules: true,
        services: true,
        hostelSettings: true,
      },
    });
  }

  async getHostelBytoken(userId: number) {
    try {
      const hostel = await this.prisma.hostel.findFirst({
        where: { userId: Number(userId) },
      });
      return hostel; // Return the decoded user ID
    } catch (error) {
      console.log(error);
      // Token verification failed
      throw new NotFoundException('hostel not found');
    }
  }

  async createHostel(userId: number, data: CreateHostelInput) {
    const slug = generateSlug(data.name, data.genderType, data.hostelType);

    try {
      const res = await this.prisma.hostel.create({
        data: { ...data, slug: slug, userId },
      });
      console.log('create hostel response', res);
      if (res.hostelId) {
        const user = await this.prisma.users.update({
          where: { userId },
          data: { hostelId: res.hostelId },
        });
        console.log('update user response', user);
        return res;
      } else {
        throw new ForbiddenException('not allowed');
      }
    } catch (error) {
      throw new ForbiddenException('not allowed');
    }
  }

  async updateHostel(hostelId: number, data: UpdateHostelInput) {
    return this.prisma.hostel.update({ where: { hostelId }, data });
  }

  async deleteHostel(hostelId: number) {
    return this.prisma.hostel.delete({ where: { hostelId } });
  }
}
