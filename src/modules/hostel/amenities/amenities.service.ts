import { Injectable } from '@nestjs/common';
import { Amenities } from '@src/models/global.model';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateAmenitiesInput } from './dtos/create-amenities.input';
import { UpdateAmenitiesInput } from './dtos/update-amenities.input';

@Injectable()
export class AmenitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAmenitiesById(amenitiesId: number): Promise<Amenities | null> {
    return this.prisma.amenities.findUnique({
      where: { amenitiesId },
    });
  }

  async getAmenitiesByHostelId(hostelId: number): Promise<Amenities | null> {
    const amenities = await this.prisma.amenities.findUnique({
      where: { hostelId },
    });

    return amenities ?? null;
  }

  async createAmenities(data: CreateAmenitiesInput): Promise<Amenities> {
    return this.prisma.amenities.create({
      data,
    });
  }

  async updateAmenities(
    amenitiesId: number,
    data: UpdateAmenitiesInput,
  ): Promise<Amenities> {
    return this.prisma.amenities.update({
      where: { amenitiesId },
      data,
    });
  }

  async deleteAmenities(amenitiesId: number): Promise<Amenities> {
    return this.prisma.amenities.delete({
      where: { amenitiesId },
    });
  }
}
