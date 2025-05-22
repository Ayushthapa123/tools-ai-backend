import {
  Post,
  Controller,
  HttpStatus,
  UploadedFile,
  HttpException,
  UseInterceptors,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { v4 as uuidv4 } from 'uuid'; // Import UUID generator

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import * as dotenv from 'dotenv'; // Import dotenv to access environment variables

dotenv.config(); // Load environment variables from .env file if present

@Controller('upload/image')
export class ImageController {
  constructor() {}

  @Get()
  getHello() {
    return { message: 'Hello from Image Controller!' };
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() image: any) {
    try {
      // Configure the client
      const s3Client = new S3Client({
        region: 'us-east-1', // fake region; required even for S3-compatible
        endpoint: 'https://s3-np1.datahub.com.np', // change this to your custom endpoint
        forcePathStyle: true, // required for many S3-compatible providers
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        },
      });

      const imageType = String(image.originalname).split('.')[1];
      const key = `${uuidv4()}.${imageType}`;

      await s3Client.send(
        new PutObjectCommand({
          Bucket: 'homestay',
          Key: key,
          Body: image.buffer,
          ACL: 'public-read',
        }),
      );
      return {
        imageUrl: `https://s3-np1.datahub.com.np/homestay/${key}`,
      };
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new HttpException(
        'Error uploading image',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
