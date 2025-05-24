import { Prisma } from '@prisma/client';
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateHostelSettingsInput } from './dtos/create-settings.input';
import { UpdateHostelSettingsInput } from './dtos/update-settings.input';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async getSettingsByHostelId(hostelId: number) {
    try {
      const settings = await this.prisma.hostelSetting.findUnique({
        where: { hostelId },
      });

      if (!settings) {
        throw new NotFoundException(
          `Settings not found for hostel ID: ${hostelId}`,
        );
      }

      return {
        data: settings,
        error: null,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch hostel settings');
    }
  }

  async createSettings(hostelId: number, data: CreateHostelSettingsInput) {
    try {
      const createData: Prisma.HostelSettingCreateInput = {
        ...data,
        hostel: {
          connect: { id: hostelId },
        },
      };

      const settings = await this.prisma.hostelSetting.create({
        data: createData,
      });

      return {
        data: settings,
        error: null,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new InternalServerErrorException(
            'Settings already exist for this hostel',
          );
        }
        if (error.code === 'P2025') {
          throw new NotFoundException(`Hostel with ID ${hostelId} not found`);
        }
      }
      throw new InternalServerErrorException(
        'Failed to create hostel settings',
      );
    }
  }

  async updateSettings(
    hostelSettingId: number,
    data: UpdateHostelSettingsInput,
  ) {
    try {
      const settings = await this.prisma.hostelSetting.update({
        where: { id: hostelSettingId },
        data,
      });

      return {
        data: settings,
        error: null,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            `Settings with ID ${hostelSettingId} not found`,
          );
        }
      }
      throw new InternalServerErrorException(
        'Failed to update hostel settings',
      );
    }
  }

  async deleteSettings(hostelSettingId: number) {
    try {
      const settings = await this.prisma.hostelSetting.delete({
        where: { id: hostelSettingId },
      });

      return {
        data: settings,
        error: null,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            `Settings with ID ${hostelSettingId} not found`,
          );
        }
      }
      throw new InternalServerErrorException(
        'Failed to delete hostel settings',
      );
    }
  }
}
