import { UpdateHomestayInput } from './dtos/update-homestay.input';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Homestay } from '@src/models/global.model';
import { generateSlug } from '@src/helpers/generateSlug';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateHomestayInput } from './dtos/create-homestay.input';
import { UserType } from '@src/models/global.enum';

@Injectable()
export class HomestayService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllHomestays(pageSize: number, pageNumber: number) {
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;
    const homestays = await this.prisma.homestay.findMany({
      skip,
      take,
      include: {
        address: true,
        contact: true,
        image: true,
        rooms: {
          include: {
            image: true,
          },
        },
        // owner: true,
      },
    });

    const convertedHomestays = homestays.map((homestay) => ({
      ...homestay,
      rooms: homestay.rooms.map((room) => ({
        ...room,
        status: room.status as any, // Type assertion to handle enum conversion
      })),
    })) as Homestay[];

    return {
      data: convertedHomestays,
      error: null,
    };
  }

  async getHomestayById(homestayId: number) {
    const homestay = await this.prisma.homestay.findUnique({
      where: { id: homestayId },
    });
    return {
      data: homestay,
      error: null,
    };
  }

  async getHomestayBySlug(
    slug: string,
    checkInDate?: Date,
    checkOutDate?: Date,
  ) {
    const userCheckInDate = checkInDate || new Date('1970-01-01');
    const userCheckOutDate = checkOutDate || new Date('1970-01-01');
    const homestay = await this.prisma.homestay.findUnique({
      where: { slug },
      include: {
        address: true,
        image: true,
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

    if (!homestay)
      return {
        data: null,
        error: {
          message: 'homestay not found',
        },
      };
    console.log('aaaaaaaaaa', homestay.rooms?.[0]?.image);

    // Convert Prisma RoomStatus to global RoomStatus
    const convertedHomestay = {
      ...homestay,
      rooms: homestay.rooms.map((room) => ({
        ...room,
        status: room.status as any, // Type assertion to handle enum conversion
      })),
    };

    return {
      data: convertedHomestay,
      error: null,
    };
  }

  async getHomestayBytoken(userId: number) {
    try {
      const homestay = await this.prisma.homestay.findFirst({
        where: { ownerId: Number(userId) },
      });
      return {
        data: homestay,
        error: null,
      };
    } catch (error) {
      // Token verification failed
      return {
        data: null,
        error: {
          message: 'homestay not found',
        },
      };
    }
  }

  async createHomestay(userId: number, data: CreateHomestayInput) {
    const slug = generateSlug(data.name);

    try {
      const res = await this.prisma.homestay.create({
        data: { ...data, slug: slug, ownerId: userId },
      });
      if (res.id) {
        await this.prisma.user.update({
          where: { id: userId },
          data: { homestayId: res?.id },
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

  async updateHomestay(homestayId: number, data: UpdateHomestayInput) {
    const res = await this.prisma.homestay.update({
      where: { id: homestayId },
      data,
    });
    return {
      data: res,
      error: null,
    };
  }

  async deleteHomestay(homestayId: number) {
    const res = await this.prisma.homestay.delete({
      where: { id: homestayId },
    });
    return {
      data: res,
      error: null,
    };
  }

  async verifyHomestay(homestayId: number, userType: string, status: boolean) {
    if (userType === UserType.COMMUNITY_OWNER) {
      const res = await this.prisma.homestay.update({
        where: { id: homestayId },
        data: {
          moderatedByCommunityOwner: status,
        },
      });
      return {
        data: res,
        error: null,
      };
    } else if (userType === UserType.SUPERADMIN) {
      const res = await this.prisma.homestay.update({
        where: { id: homestayId },
        data: { moderatedBySuperAdmin: status },
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
