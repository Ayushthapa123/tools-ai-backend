import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FoodMenuService } from './food-menu.service';
import { FoodMenu } from '@src/models/global.model';
import { CreateFoodMenu } from './dtos/createFoodMenu.dto';
import { UpdateFoodMenu } from './dtos/updateFoodMenu.dto';

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

    @Mutation(()=>FoodMenu)
    async createMenu(@Args('data') data:CreateFoodMenu){
        return this.foodMenuService.createMenu(data);
    }

    @Mutation(()=>FoodMenu)
    async updateMenu(@Args('updatedData') updatedData:UpdateFoodMenu,@Args("id") id:number){
        return this.foodMenuService.updateMenu(id,updatedData);
    }

    @Mutation(()=>[FoodMenu])
    async deleteMenu(@Args('id') id:number){
        return this.foodMenuService.deleteMenu(id);
    }
}
