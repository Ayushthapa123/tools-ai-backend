import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async createService(createServiceDto: CreateServiceDto) {
    const service = await this.prisma.services.create({
      data: createServiceDto,
    });

    return {
      data: service,
      error: null,
    };
  }

  async findByHomestayId(homestayId: number) {
    const service = await this.prisma.services.findUnique({
      where: { homestayId },
    });

    return {
      data: service,
      error: null,
    };
  }

  async updateService(updateServiceDto: UpdateServiceDto) {
    const { id, ...data } = updateServiceDto;
    const service = await this.prisma.services.update({
      where: { id },
      data,
    });

    return {
      data: service,
      error: null,
    };
  }

  async removeService(id: number) {
    const service = await this.prisma.services.delete({
      where: { id },
    });

    return {
      data: service,
      error: null,
    };
  }
}
