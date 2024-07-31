import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateSHostelsInput } from './dtos/create-s-hostels.input';
import { UpdateSHostelsInput } from './dtos/update-s-hostels.input';
import { SHostels } from '@src/models/global.model';

@Injectable()
export class SHostelsService {
  constructor(private readonly prisma: PrismaService) {}

  async getSHostelsById(sHostelsId: number): Promise<SHostels | null> {
    return this.prisma.sHostels.findUnique({
      where: { sHostelsId },
    });
  }

  async getSHostels(): Promise<SHostels[]> {
    return this.prisma.sHostels.findMany();
  }

  async createSHostels(data: CreateSHostelsInput): Promise<SHostels> {
    return this.prisma.sHostels.create({
      data,
    });
  }

  async updateSHostels(sHostelsId: number, data: UpdateSHostelsInput): Promise<SHostels> {
    return this.prisma.sHostels.update({
      where: { sHostelsId },
      data,
    });
  }

  async deleteSHostels(sHostelsId: number): Promise<SHostels> {
    return this.prisma.sHostels.delete({
      where: { sHostelsId },
    });
  }
}
