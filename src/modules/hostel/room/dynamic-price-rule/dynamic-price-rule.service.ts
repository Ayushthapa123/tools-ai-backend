import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateDynamicPriceRuleInput } from './dtos/create-dynamic-price-rule.input';
import { UpdateDynamicPriceRuleInput } from './dtos/update-dynamic-price-rule.input';
import {
  DynamicPriceRule as DynamicPriceRuleResponse,
  // DynamicPricingRule,
} from '@src/models/global.model';

@Injectable()
export class DynamicPriceRuleService {
  constructor(private prisma: PrismaService) {}

  async create(
    createPriceInput: CreateDynamicPriceRuleInput,
    homestayId: number,
  ): Promise<DynamicPriceRuleResponse> {
    const {
      name,
      description,
      roomId,
      startDate,
      endDate,
      amount,
      isWeekend,
      isActive,
      priority,
    } = createPriceInput;

    // Check if room exists and belongs to the homestay
    const room = await this.prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      return {
        error: {
          message: `Room with ID ${roomId} not found`,
        },
        data: null,
      };
    }

    if (room.homestayId !== homestayId) {
      throw new ForbiddenException(
        'You do not have permission to create price for this room',
      );
    }
    // also see if existing rule conflicts with the new rule. Check if date range overlaps with any existing rule
    const existingRule = await this.prisma.dynamicPricingRule.findFirst({
      where: {
        roomId,
        startDate: {
          lte: endDate,
        },
        endDate: {
          gte: startDate,
        },
      },
    });

    if (existingRule) {
      return {
        error: {
          message: 'This rule conflicts with an existing rule',
        },
        data: null,
      };
    }

    const data = await this.prisma.dynamicPricingRule.create({
      data: {
        name,
        description,
        roomId,
        startDate,
        endDate,
        amount,
        isWeekend,

        priority,
        isActive,
      },
    });

    return {
      data,
      error: null,
    };
  }

  async findAll(): Promise<DynamicPriceRuleResponse[]> {
    const data = await this.prisma.dynamicPricingRule.findMany();
    return data.map((item) => ({
      data: item,
      error: null,
    }));
  }

  async findOne(id: number): Promise<DynamicPriceRuleResponse> {
    const price = await this.prisma.dynamicPricingRule.findUnique({
      where: { id },
    });

    if (!price) {
      return {
        error: {
          message: `Price with ID ${id} not found`,
        },
        data: null,
      };
    }

    return {
      data: price,
      error: null,
    };
  }

  async update(
    updatePriceInput: UpdateDynamicPriceRuleInput,
    homestayId: number,
  ): Promise<DynamicPriceRuleResponse> {
    const { id, ...rest } = updatePriceInput;

    const price = await this.prisma.dynamicPricingRule.findUnique({
      where: { id },
      include: {
        room: true,
      },
    });

    if (!price) {
      return {
        error: {
          message: `Price with ID ${id} not found`,
        },
        data: null,
      };
    }

    if (price.room.homestayId !== homestayId) {
      return {
        error: {
          message: 'You do not have permission to update this price',
        },
        data: null,
      };
    }

    const data = await this.prisma.dynamicPricingRule.update({
      where: { id },
      data: rest,
    });

    return {
      data,
      error: null,
    };
  }

  async remove(
    id: number,
    homestayId: number,
  ): Promise<DynamicPriceRuleResponse> {
    const price = await this.prisma.dynamicPricingRule.findUnique({
      where: { id },
      include: {
        room: true,
      },
    });

    if (!price) {
      return {
        error: {
          message: `Price with ID ${id} not found`,
        },
        data: null,
      };
    }

    if (price.room.homestayId !== homestayId) {
      throw new ForbiddenException(
        'You do not have permission to delete this price',
      );
    }

    const data = await this.prisma.dynamicPricingRule.delete({
      where: { id },
    });

    return {
      data,
      error: null,
    };
  }

  async findPriceRulesByRoomId(
    roomId: number,
  ): Promise<DynamicPriceRuleResponse[]> {
    const price = await this.prisma.dynamicPricingRule.findMany({
      where: { roomId: roomId },
    });

    if (!price) {
      throw new NotFoundException(
        `Price rules for room with ID ${roomId} not found`,
      );
    }

    return price.map((item) => ({
      data: item,
      error: null,
    }));
  }
}
