import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateNearbyPlaceInput } from './dtos/create-nearby-place.input';
import { UpdateNearbyPlaceInput } from './dtos/update-nearby-place.input';
import { NearbyPlace } from '../../../models/global.model';

@Injectable()
export class NearbyPlaceService {
  constructor(private readonly prisma: PrismaService) {}

  async getNearbyPlaceById(nearbyPlaceId: number,hostelId:number): Promise<NearbyPlace | null> {
    return this.prisma.nearbyPlace.findUnique({
      where: { nearbyPlaceId ,hostelId},
    });
  }
  async getNearbyPlacesByHostelId(hostelId:number): Promise<NearbyPlace[] | null> {
    return this.prisma.nearbyPlace.findMany({
      where: { hostelId},
    });
  }

  async createNearbyPlace(data: CreateNearbyPlaceInput): Promise<NearbyPlace> {


    return this.prisma.nearbyPlace.create({ data });
  }

  async updateNearbyPlace(nearbyPlaceId: number, data: UpdateNearbyPlaceInput): Promise<NearbyPlace> {


    return this.prisma.nearbyPlace.update({ where: { nearbyPlaceId }, data });
  }

  async deleteNearbyPlace(nearbyPlaceId: number): Promise<NearbyPlace> {
    return this.prisma.nearbyPlace.delete({ where: { nearbyPlaceId } });
  }
}
