import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { GoogleMapLocation } from '../../../models/global.model';
import { UpdateGoogleMapLocation } from './dtos/update-googleMapLocation.input';
import { CreateGoogleMapLocationInput } from './dtos/create-googleMapLocation.input';

@Injectable()
export class GoogleMapLocationService {
  constructor(private readonly prisma: PrismaService) {}

  async getGoogleMapLocationByHostelId(
    id: number,
  ): Promise<GoogleMapLocation | null> {
    return this.prisma.googleMapLocation.findUnique({
      where: { hostelId: id },
    });
  }

  async createGoogleMapLocation(
    hostelId: number,
    data: CreateGoogleMapLocationInput,
  ) {
    const createData = {
      ...data,
      hostel: {
        connect: { hostelId },
      },
    };
    return this.prisma.googleMapLocation.create({ data: createData });
  }
  async updateGoogleMapLocation(id: number, data: UpdateGoogleMapLocation) {
    return this.prisma.googleMapLocation.update({
      where: { googleMapLocationId: id },
      data,
    });
  }

  async deleteGoogleMapLocation(id: number) {
    return this.prisma.googleMapLocation.delete({
      where: { googleMapLocationId: id },
    });
  }
}
