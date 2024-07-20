import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateHostelSettingsInput } from './dtos/create-settings.input';
import { UpdateHostelSettingsInput } from './dtos/update-settings.input';;
import { HostelSettings } from '../../../models/global.model';
import { Prisma } from '@prisma/client';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async getSettingsByHostelId(hostelId: number): Promise<HostelSettings | null> {
    return this.prisma.hostelSettings.findUnique({
      where: { hostelId },
    });
  }

  async createSettings(hostelId: number, data: CreateHostelSettingsInput) {
    const createData: Prisma.HostelSettingsCreateInput = {
      ...data,
      hostel: {
        connect: { hostelId },
      },
    };
    return this.prisma.hostelSettings.create({ data: createData });
  }
  async updateSettings(hostelSettingId: number, data: UpdateHostelSettingsInput) {
    return this.prisma.hostelSettings.update({
      where: { hostelSettingId },
      data,
    });
  }

  async deleteSettings(hostelSettingId: number) {
    return this.prisma.hostelSettings.delete({
      where: { hostelSettingId },
    });
  }
}
