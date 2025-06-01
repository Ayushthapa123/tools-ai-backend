import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateServiceOptionInput } from './dtos/create-service-option.input';
import { UpdateServiceOptionInput } from './dtos/update-service-option.input';

@Injectable()
export class ServiceOptionService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    const res = await this.prisma.serviceOption.findMany({
      take: 100,
    });
    return {
      data: res,
      error: null,
    };
  }

  async getServiceOptionById(serviceOptionId: number) {
    const res = await this.prisma.serviceOption.findUnique({
      where: { id: serviceOptionId },
    });
    return {
      data: res,
      error: null,
    };
  }

  async create(data: CreateServiceOptionInput) {
    const serviceOption = await this.prisma.serviceOption.findFirst({
      where: { name: data.name },
    });
    if (!serviceOption) {
      const res = await this.prisma.serviceOption.create({
        data,
      });
      return {
        data: res,
        error: null,
      };
    } else {
      return {
        data: null,
        error: {
          message: 'Service option already exists',
        },
      };
    }
  }

  async update(id: number, data: UpdateServiceOptionInput) {
    const serviceOption = await this.prisma.serviceOption.findFirst({
      where: { id: id },
    });

    if (serviceOption) {
      const res = await this.prisma.serviceOption.update({
        where: { id: id },
        data,
      });
      return {
        data: res,
        error: null,
      };
    } else {
      return {
        data: null,
        error: {
          message: 'Service option not found',
        },
      };
    }
  }

  async delete(id: number) {
    const res = await this.prisma.serviceOption.delete({
      where: { id: id },
    });
    return {
      data: res,
      error: null,
    };
  }
}
