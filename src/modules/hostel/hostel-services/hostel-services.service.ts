import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateHostelServiceDto } from './dto/createHostelService.dto';
import { UpdateHostelServiceDto } from './dto/updateHostelService.dto';
import { HostelServiceType, Status, Priority } from '@src/models/global.enum';
import { HostelService, HostelServiceData } from '@src/models/global.model';

@Injectable()
export class HostelServicesService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll() {
    try {
      const result = await this.prisma.hostelService.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          hostel: true,
        },
      });
      return {
        data: result,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: {
          message: `Hostel Service not found`,
        },
      }
    }
  }

  async findById(id: number) {
    try {
      const result = await this.prisma.hostelService.findUnique({
        where: {
          id,
        },
      });

      if (!result) {
        return {
          data: null,
          error: {
            message: `Hostel Service with id ${id} not found`,
          },
        };
      }

      return {
        data: result,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: {
          message: `Error finding hostel service with id ${id}`,
        },
      };
    }
  }
  
  async findByHostelId(hostelId: number):Promise<{data:HostelServiceData[],error:any}> {
    try {
      const result = await this.prisma.hostelService.findMany({
        where: {
          hostelId,
          isDeleted: false,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return {
        data: result.map((service) => ({
          ...service,
          hostelServiceType: service.hostelServiceType as HostelServiceType,
          priority: service.priority as Priority,
          status: service.status as Status,
        })),
        error: null,
      };
    } catch (error) {
      return {  
        data: null,
        error: {
          message: `Error finding hostel service with hostel id ${hostelId}`,
        },
      };
    }
  } 

  async create(input: CreateHostelServiceDto) {
    try {
      const { hostelId, ...restInput } = input;
      const result = await this.prisma.hostelService.create({
        data: {
          ...restInput,
          hostel: {
            connect: {
              id: hostelId,
            },
          },
        },
      });

      return {
        data: result,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: {
          message: error.message,
        },
      };
    }
  }

  async update(input: UpdateHostelServiceDto) {
    try {
      const { id, ...data } = input;
      const hostelService = await this.findById(Number(id));
      if (hostelService.error) {
        return {
          data: null,
          error: {
            message: "Hostel service not found",
          },
        };
      }
      const result = await this.prisma.hostelService.update({
        where: {
          id: Number(id),
        },
        data:{
          ...data,
          budget: Number(data.budget),
        },
      });

      return {
        data: result,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: {
          message: error.message,
          // message: `Error updating hostel service with id ${input.id}`,
        },
      };
    }
  }

  async delete(id: number) {
    try {
      const result = await this.prisma.hostelService.update({
        where: {
          id,
        },
        data: {
          isDeleted: true,
        },
      });

      return {
        data: result,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: {
          message: `Error deleting hostel service with id ${id}`,
        },
      };
    }
  }

  async cancel(id: number) {
    try {
      const result = await this.prisma.hostelService.update({
        where: {
          id,
        },
        data: {
          status: Status.CANCELLED,
        },
      });

      return {
        data: result,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: {
          message: `Error cancelling hostel service with id ${id}`,
        },
      };
    }
  }

  async complete(id: number) {
    try {
      const result = await this.prisma.hostelService.update({
        where: {
          id,
        },
        data: {
          status: Status.COMPLETED,
          completionDate: new Date(),
        },
      });

      return {
        data: result,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: {
          message: `Error completing hostel service with id ${id}`,
        },
      };
    }
  }
}
