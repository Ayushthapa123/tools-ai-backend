import { Module } from '@nestjs/common';
import { TbcModule } from './travel-budget-calculator/tbc.module';

@Module({
  imports: [TbcModule],
})
export class ToolsModule {}
