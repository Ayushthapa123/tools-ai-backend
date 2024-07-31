import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateServicesInput } from './dtos/create-services.input';
import { UpdateServicesInput } from './dtos/update-services.input';
import { Services } from '@src/models/global.model';

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  async getServicesById(servicesId: number): Promise<Services | null> {
    return this.prisma.services.findUnique({
      where: { servicesId },
    });
  }

  async getServicesByHostelId(hostelId: number): Promise<Services | null> {
    return this.prisma.services.findUnique({
      where: { hostelId },
    });
  }

  async createServices(data: CreateServicesInput): Promise<Services> {
    return this.prisma.services.create({
      data,
    });
  }

  async updateServices(servicesId: number, data: UpdateServicesInput): Promise<Services> {
    return this.prisma.services.update({
      where: { servicesId },
      data,
    });
  }

  async deleteServices(servicesId: number): Promise<Services> {
    return this.prisma.services.delete({
      where: { servicesId },
    });
  }
}
