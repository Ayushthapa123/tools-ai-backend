import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FoodMenuService } from './food-menu.service';
import { FoodMenu } from '@src/models/global.model';
import { CreateFoodMenu } from './dtos/create-food-menu.dto';
import { UpdateFoodMenu } from './dtos/update-food-menu.dto';

@Resolver()
export class FoodMenuResolver {
    constructor(private readonly foodMenuService:FoodMenuService){}

    @Query(()=>[FoodMenu])
    async getFoodMenus(){
        return this.foodMenuService.getAllFoodMenus();
    }

    @Query(()=>FoodMenu)
    async getFoodMenuById(@Args('id') id:number){
        return this.foodMenuService.getFoodMenuById(id);
    }

    @Query(()=>[FoodMenu])
    async getFoodMenuByHostelId(@Args("hostelId") hostelId:number){
        return this.foodMenuService.getFoodMenuByHostelId(hostelId);
    }

    @Mutation(()=>FoodMenu)
    async createMenu(@Args('data') data:CreateFoodMenu){
        return this.foodMenuService.createMenu(data);
    }

    @Mutation(()=>FoodMenu)
    async updateMenu(@Args('updatedData') updatedData:UpdateFoodMenu,@Args("foodMenuId") foodMenuId:number,@Args("accessToken") accessToken:string){
        return this.foodMenuService.updateMenu(foodMenuId,updatedData,accessToken);
    }

    @Mutation(()=>[FoodMenu])
    async deleteMenu(@Args('id') id:number,@Args("accessToken") accessToken:string){
        return this.foodMenuService.deleteMenu(id,accessToken);
    }
}
