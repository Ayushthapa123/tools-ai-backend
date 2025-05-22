import { Module } from '@nestjs/common';
import { ImageController } from './image.controller.';
@Module({
  providers: [],
  controllers: [ImageController],
})
export class ImageModule {}
