import { UpdateHostelInput } from './dtos/update-hostel.input';
import { Injectable } from '@nestjs/common';
// import { HostelData } from '@src/models/global.model';
import { generateSlug } from '@src/helpers/generateSlug';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateHostelInput,
  CreateOnboardingHostelInput,
} from './dtos/create-hostel.input';
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
        owner: true,
        rooms: {
          include: {
            image: true,
            price: true,
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
        service: true,
        rooms: {
          include: {
            image: true,
            roomAmenity: true,
            price: true,
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

  async createOnboardingHostel(
    userId: number,
    data: CreateOnboardingHostelInput,
  ) {
    const slug = generateSlug(data.name);

    try {
      const createHostel = await this.prisma.hostel.create({
        data: {
          slug: slug,
          ownerId: userId,
          hostelType: data.hostelType,
          genderType: data.genderType,
          description: data.description,
          name: data.name,
          verifiedBySuperAdmin: data.isVerifiedBySuperAdmin,
        },
      });
      console.log('createHostel', createHostel);
      // update the user with the hostel id
      if (createHostel?.id) {
        await this.prisma.user.update({
          where: { id: userId },
          data: { hostelId: createHostel.id },
        });
        console.log('updated user', createHostel);
      }

      const createAddress = await this.prisma.address.create({
        data: {
          hostelId: createHostel.id,
          city: data.address.city,
          country: data.address.country,
          subCity: data.address.subCity,

          street: data.address.street,
          latitude: data.address.latitude,
          longitude: data.address.longitude,
        },
      });
      console.log('createAddress', createAddress);

      if (data.amenity) {
        const createAmenities = await this.prisma.amenities.create({
          data: {
            amenities: data.amenity,
            hostelId: createHostel.id,
          },
        });
        console.log('createAmenities', createAmenities);
      }

      const createContact = await this.prisma.contactDetail.create({
        data: { ...data.contact, hostelId: createHostel.id },
      });
      console.log('createContact', createContact);

      if (data.gallery) {
        const createGallery = await this.prisma.gallery.create({
          data: { ...data.gallery, hostelId: createHostel.id },
        });
        console.log('createGallery', createGallery);
      }
      // update the user with the hostel id
      if (createHostel.id) {
        await this.prisma.user.update({
          where: { id: userId },
          data: { hostelId: createHostel.id },
        });
        console.log('updated user', createHostel);
      }
      return {
        data: createHostel,
        error: null,
      };
    } catch (error) {
      console.log('error', error);
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
      console.log('calling verify hostel', res.id, status);
      if (res.id && status) {
        console.log('inside');
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
