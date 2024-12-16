import { Module } from '@nestjs/common';
import { FoodMenuResolver } from './food-menu.resolver';
import { FoodMenuService } from './food-menu.service';

@Module({
  providers: [FoodMenuResolver, FoodMenuService],
})
export class FoodMenuModule {}
