import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateAmenityInput } from './dto/create-amenity.dto';
import { UpdateAmenityInput } from './dto/update-amenity.dto';

@Injectable()
export class AmenityService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const amenities = await this.prisma.amenities.findMany({});

    return {
      data: amenities,
      error: null,
    };
  }

  async findOne(id: number) {
    const amenity = await this.prisma.amenities.findUnique({
      where: { id },
    });

    if (!amenity) {
      return {
        data: null,
        error: {
          message: `Amenity with ID ${id} not found`,
        },
      };
    }

    return {
      data: amenity,
      error: null,
    };
  }

  async findByHostelId(hostelId: number) {
    const amenities = await this.prisma.amenities.findFirst({
      where: { hostelId },
    });

    return {
      data: amenities,
      error: null,
    };
  }

  async create(createAmenityInput: CreateAmenityInput) {
    // Verify that the hostel exists
    const hostel = await this.prisma.hostel.findUnique({
      where: { id: createAmenityInput.hostelId },
    });

    if (!hostel) {
      return {
        data: null,
        error: {
          message: `Hostel with ID ${createAmenityInput.hostelId} not found`,
        },
      };
    }

    const amenity = await this.prisma.amenities.create({
      data: {
        hostelId: createAmenityInput.hostelId,
        amenities: createAmenityInput.amenity,
      },
    });

    return {
      data: amenity,
      error: null,
    };
  }

  async update(updateAmenityInput: UpdateAmenityInput) {
    // Verify that the amenity exists
    await this.findOne(updateAmenityInput.id);

    // If hostelId is being updated, verify that the hostel exists
    if (updateAmenityInput.hostelId) {
      const hostel = await this.prisma.hostel.findUnique({
        where: { id: updateAmenityInput.hostelId },
      });

      if (!hostel) {
        return {
          data: null,
          error: {
            message: `Hostel with ID ${updateAmenityInput.hostelId} not found`,
          },
        };
      }
    }

    const amenity = await this.prisma.amenities.update({
      where: { id: updateAmenityInput.id },
      data: {
        amenities: updateAmenityInput.amenity,
      },
    });

    return {
      data: amenity,
      error: null,
    };
  }

  async remove(id: number) {
    // Verify that the amenity exists
    await this.findOne(id);

    const amenity = await this.prisma.amenities.delete({
      where: { id },
    });

    return {
      data: amenity,
      error: null,
    };
  }
}
