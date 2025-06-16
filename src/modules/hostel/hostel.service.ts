import { UpdateHostelInput } from './dtos/update-hostel.input';
import { Injectable } from '@nestjs/common';
// import { HostelData } from '@src/models/global.model';
import { generateSlug } from '@src/helpers/generateSlug';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateHostelInput } from './dtos/create-hostel.input';
import { UserType } from '@src/models/global.enum';
import { MailersendService } from '../mailersend/mailersend.service';

@Injectable()
export class HostelService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailersendService: MailersendService,
  ) {}

  async getAllHostels(
    pageSize: number,
    pageNumber: number,
    isSuperAdmin: boolean,
  ) {
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;
    // superadmin should get all verified/non verified hostels but other should get only verified
    const hostels = await this.prisma.hostel.findMany({
      where: isSuperAdmin
        ? {}
        : {
            verifiedBySuperAdmin: true,
          },
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
      if (res.id && status) {
        // send email saying your hostle has been verified
        const owner = await this.prisma.user.findUnique({
          where: { id: res.ownerId },
        });

        this.mailersendService.sendHostelVerifiedEmail(
          owner.email,
          owner.fullName,
          res.id,
        );
      }
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

  async getOnboardingData(hostelId: number) {
    if (!hostelId) {
      return {
        data: null,
        error: {
          message: 'hostelId is required',
        },
      };
    }
    const res = await this.prisma.hostel.findUnique({
      where: { id: hostelId },
      select: {
        id: true,
        address: {
          select: {
            id: true,
          },
        },
        contact: {
          select: {
            id: true,
          },
        },
        amenities: {
          select: {
            id: true,
          },
        },
        gallery: {
          select: {
            id: true,
          },
          take: 1,
        },
        rooms: {
          select: {
            id: true,
          },
          take: 1,
        },
      },
    });

    return {
      data: res,
      error: null,
    };
  }

  async completeOnboarding(hostelId: number) {
    // also validate if the hostel has all the required fields for onboarding
    const hostel = await this.prisma.hostel.findUnique({
      where: { id: hostelId },
      select: {
        address: true,
        contact: true,
        gallery: true,
        rooms: true,
        amenities: true,
      },
    });
    if (
      !hostel.address ||
      !hostel.contact ||
      !hostel.gallery.length ||
      !hostel.rooms.length ||
      !hostel.amenities
    ) {
      return {
        data: null,
        error: {
          message: 'Please fill all the required fields',
        },
      };
    }

    const res = await this.prisma.hostel.update({
      where: { id: hostelId },
      data: { hasOnboardingComplete: true },
    });
    return {
      data: res,
      error: null,
    };
  }
}
