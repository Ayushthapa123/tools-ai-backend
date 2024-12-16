import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class FoodMenuService {
    constructor(private readonly prismaService:PrismaService){}

    async getAllFoodMenus(){
        return this.prismaService.foodMenu.findMany();
    }

    async getFoodMenuById(id){
        return this.prismaService.foodMenu.findUnique({
            where:{
                foodMenuId:id
            }
        })
    }

    async createMenu(data){
        return this.prismaService.foodMenu.create({
            data
        })
    }

    async updateMenu(id,updatedData){
        return this.prismaService.foodMenu.update({
            where:{
                foodMenuId:id,
            },
            data:updatedData,
        })
    }

    async deleteMenu(id){
        return this.prismaService.foodMenu.delete({
            where:{
                foodMenuId:id,
            }
        })
    }
}
