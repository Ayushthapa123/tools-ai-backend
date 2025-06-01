import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateAmenityOptionInput } from './dtos/create-amenity-option.input';
import { UpdateAmenityOptionInput } from './dtos/update-amenity-option.input';

@Injectable()
export class AmenityOptionService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    const res = await this.prisma.amenityOption.findMany({
      take: 100,
    });
    return {
      data: res,
      error: null,
    };
  }

  async getAmenityOptionById(amenityOptionId: number) {
    const res = await this.prisma.amenityOption.findUnique({
      where: { id: amenityOptionId },
    });
    return {
      data: res,
      error: null,
    };
  }

  async create(data: CreateAmenityOptionInput) {
    const amenityOption = await this.prisma.amenityOption.findFirst({
      where: { name: data.name },
    });
    if (!amenityOption) {
      const res = await this.prisma.amenityOption.create({
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
          message: 'Amenity option already exists',
        },
      };
    }
  }

  async update(id: number, data: UpdateAmenityOptionInput) {
    const amenity = await this.prisma.amenityOption.findFirst({
      where: { id: id },
    });
    console.log(amenity);

    if (amenity) {
      const res = await this.prisma.amenityOption.update({
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
          message: 'Amenity option already exists',
        },
      };
    }
  }

  async delete(id: number) {
    const res = await this.prisma.amenityOption.delete({
      where: { id: id },
    });
    return {
      data: res,
      error: null,
    };
  }
}
