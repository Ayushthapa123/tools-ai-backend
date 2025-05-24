import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async createService(createServiceDto: CreateServiceDto) {
    const service = await this.prisma.service.create({
      data: {
        ...createServiceDto,
      },
    });

    return {
      data: service,
      error: null,
    };
  }

  async findByHostelId(hostelId: number) {
    const service = await this.prisma.service.findUnique({
      where: { hostelId },
    });

    return {
      data: service,
      error: null,
    };
  }

  async updateService(updateServiceDto: UpdateServiceDto) {
    const { id, ...data } = updateServiceDto;
    const service = await this.prisma.service.update({
      where: { id },
      data,
    });

    return {
      data: service,
      error: null,
    };
  }

  async removeService(id: number) {
    const service = await this.prisma.service.delete({
      where: { id },
    });

    return {
      data: service,
      error: null,
    };
  }
}
