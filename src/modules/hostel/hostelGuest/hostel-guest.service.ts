import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateHostelGuestInput } from './dtos/create-hostel-guest.input';
import { UpdateHostelGuestInput } from './dtos/update-hostel-guest.input';
import { MailersendService } from '@src/modules/mailersend/mailersend.service';
import { generateHostelGuestJwtToken } from '@src/helpers/jwt.helper';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class HostelGuestService {
  constructor(
    private prisma: PrismaService,
    private mailersendService: MailersendService,
    private jwtService: JwtService,
  ) {}

  async create(
    createHostelGuestInput: CreateHostelGuestInput,
    hostelId: number,
    withEmail: boolean,
  ) {
    const {
      fullName,
      email,
      phoneNumber,
      gender,
      dateOfBirth,
      emergencyContact,
      permanentAddress,
      nationality,
      occupation,
      notes,
      profilePicture,
      checkinDate,
      checkoutDate,
    } = createHostelGuestInput;

    const hostelGuest = await this.prisma.hostelGuest.create({
      data: {
        fullName,
        email,
        phoneNumber,
        gender,
        dateOfBirth,
        emergencyContact,
        permanentAddress,
        nationality,
        occupation,
        notes,
        profilePicture,
        hostelId,
        checkinDate,
        checkoutDate,
      },
    });

    if (withEmail) {
      const token = generateHostelGuestJwtToken(
        hostelGuest.id,
        email,
        hostelId,
      );
      await this.mailersendService.sendEmailForHostelGuestForm(
        email,
        fullName,
        token,
        // hostelId, no need to send hostelId as it is already in the token
      );
    }
    return {
      data: hostelGuest,
      error: null,
    };
  }

  async findOne(id: number, hostelId: number) {
    const hostelGuest = await this.prisma.hostelGuest.findUnique({
      where: { id, hostelId },
    });

    if (!hostelGuest) {
      return {
        data: null,
        error: {
          message: `Hostel Guest with ID ${id} not found`,
        },
      };
    }

    return {
      data: hostelGuest,
      error: null,
    };
  }

  async findHostelGuestsByHostelRoomId(hostelRoomId: number) {
    const hostelGuests = await this.prisma.hostelGuest.findMany({
      where: {
        roomId: hostelRoomId,
      },
    });

    return {
      data: hostelGuests,
      error: null,
    };
  }

  async update(
    updateHostelGuestInput: UpdateHostelGuestInput,
    hostelId: number,
  ) {
    const { id, ...rest } = updateHostelGuestInput;
    const dataToUpdate = Object.fromEntries(
      Object.entries(rest).filter(
        ([key]) => !['hostelId', 'price'].includes(key),
      ),
    );

    const hostelGuest = await this.prisma.hostelGuest.findUnique({
      where: { id },
    });

    if (!hostelGuest) {
      return {
        data: null,
        error: {
          message: `Hostel Guest with ID ${id} not found`,
        },
      };
    }

    if (hostelGuest.hostelId !== hostelId) {
      return {
        data: null,
        error: {
          message: 'You do not have permission to update this hostel guest',
        },
      };
    }

    const updatedHostelGuest = await this.prisma.hostelGuest.update({
      where: { id },
      data: dataToUpdate,
    });

    return {
      data: updatedHostelGuest,
      error: null,
    };
  }

  async remove(id: number, hostelId: number) {
    try {
      const hostelGuest = await this.prisma.hostelGuest.findUnique({
        where: { id },
      });

      if (!hostelGuest) {
        return {
          data: null,
          error: {
            message: `Hostel Guest with ID ${id} not found`,
          },
        };
      }

      if (hostelGuest.hostelId !== hostelId) {
        return {
          data: null,
          error: {
            message: 'You do not have permission to delete this hostel guest',
          },
        };
      }

      const deletedHostelGuest = await this.prisma.hostelGuest.delete({
        where: { id },
      });

      return {
        data: deletedHostelGuest,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: {
          message: 'not allowed',
        },
      };
    }
  }

  async findHostelGuestsByHostelId(hostelId: number) {
    const hostelGuests = await this.prisma.hostelGuest.findMany({
      where: { hostelId },
    });

    return {
      data: hostelGuests,
      error: null,
    };
  }

  async guestsDetailsByToken(token: string) {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
      algorithms: ['HS256'], // Specify the algorithm
    });
    const hostelGuest = await this.prisma.hostelGuest.findUnique({
      where: { id: Number(payload.sub), email: payload.email },
    });

    if (!hostelGuest) {
      return {
        data: null,
        error: {
          message: 'Hostel Guest not found',
        },
      };
    }
    return {
      data: hostelGuest,
      error: null,
    };
  }
}
