import { UpdateHostelInput } from './dtos/update-hostel.input';
import { Injectable } from '@nestjs/common';
// import { HostelData } from '@src/models/global.model';
import { generateSlug } from '@src/helpers/generateSlug';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateHostelInput } from './dtos/create-hostel.input';
import { UserType } from '@src/models/global.enum';

@Injectable()
export class HostelService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllHostels(pageSize: number, pageNumber: number) {
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;
    const hostels = await this.prisma.hostel.findMany({
      skip,
      take,
      include: {
        address: true,
        contact: true,
        gallery: true,
        rooms: {
          include: {
            image: true,
          },
        },
        // owner: true,
      },
    });

    const convertedHostels = hostels?.map((hostel) => ({
      ...hostel,
      rooms: hostel.rooms.map((room) => ({
        ...room,
        // status: room.status as any, // Type assertion to handle enum conversion
      })),
    }));

    return {
      data: convertedHostels,
      error: null,
    };
  }

  async getHostelById(hostelId: number) {
    const hostel = await this.prisma.hostel.findUnique({
      where: { id: hostelId },
    });
    return {
      data: hostel,
      error: null,
    };
  }

  async getHostelBySlug(slug: string, checkInDate?: Date, checkOutDate?: Date) {
    const userCheckInDate = checkInDate || new Date('1970-01-01');
    const userCheckOutDate = checkOutDate || new Date('1970-01-01');
    const hostel = await this.prisma.hostel.findUnique({
      where: { slug },
      include: {
        address: true,
        gallery: true,
        contact: true,
        rooms: {
          include: {
            image: true,
            roomAmenity: true,
            // price: true,
          },
          where: {
            booking: {
              none: {
                AND: [
                  {
                    status: 'CONFIRMED', // Ensure the booking is confirmed
                  },
                  {
                    startDate: {
                      lt: userCheckOutDate, // Booking start date is before the user's end date
                    },
                  },
                  {
                    endDate: {
                      gt: userCheckInDate, // Booking end after the user's start date
                    },
                  },
                ],
              },
            },
          },
        },
      },
    });

    if (!hostel)
      return {
        data: null,
        error: {
          message: 'hostel not found',
        },
      };
    console.log('aaaaaaaaaa', hostel.rooms?.[0]?.image);

    // Convert Prisma RoomStatus to global RoomStatus
    const convertedHostel = {
      ...hostel,
      rooms: hostel.rooms.map((room) => ({
        ...room,
        status: room.status as any, // Type assertion to handle enum conversion
      })),
    };

    return {
      data: convertedHostel,
      error: null,
    };
  }

  async getHostelBytoken(userId: number) {
    try {
      const hostel = await this.prisma.hostel.findFirst({
        where: { ownerId: Number(userId) },
      });
      return {
        data: hostel,
        error: null,
      };
    } catch (error) {
      // Token verification failed
      return {
        data: null,
        error: {
          message: 'hostel not found',
        },
      };
    }
  }

  async createHostel(userId: number, data: CreateHostelInput) {
    const slug = generateSlug(data.name);

    try {
      const res = await this.prisma.hostel.create({
        data: { ...data, slug: slug, ownerId: userId },
      });
      if (res.id) {
        await this.prisma.user.update({
          where: { id: userId },
          data: { hostelId: res?.id },
        });
        return {
          data: res,
          error: null,
        };
      } else {
        return {
          data: null,
          error: {
            message: 'not allowed',
          },
        };
      }
    } catch (error) {
      return {
        data: null,
        error: {
          message: 'not allowed',
        },
      };
    }
  }

  async updateHostel(hostelId: number, data: UpdateHostelInput) {
    const res = await this.prisma.hostel.update({
      where: { id: hostelId },
      data,
    });
    return {
      data: res,
      error: null,
    };
  }

  async deleteHostel(hostelId: number) {
    const res = await this.prisma.hostel.delete({
      where: { id: hostelId },
    });
    return {
      data: res,
      error: null,
    };
  }

  async verifyHostel(hostelId: number, userType: string, status: boolean) {
    if (userType === UserType.SUPERADMIN) {
      const res = await this.prisma.hostel.update({
        where: { id: hostelId },
        data: {
          verifiedBySuperAdmin: status,
        },
      });
      return {
        data: res,
        error: null,
      };
    } else if (userType === UserType.COMMUNITY_OWNER) {
      const res = await this.prisma.hostel.update({
        where: { id: hostelId },
        data: { verifiedByCommunityOwner: status },
      });
      return {
        data: res,
        error: null,
      };
    } else {
      return {
        data: null,
        error: {
          message: 'not allowed',
        },
      };
    }
  }
}
