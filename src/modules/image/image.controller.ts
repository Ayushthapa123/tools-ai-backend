import {
  Post,
  Controller,
  HttpStatus,
  UploadedFile,
  HttpException,
  UseInterceptors,
} from '@nestjs/common';
import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import * as Cloudinary from 'cloudinary';
import { FileInterceptor } from '@nestjs/platform-express';

dotenv.config();

Cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

@Controller('upload/image')
export class ImageController {
  constructor() {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() image: any) {
    console.log('iii', image);
    try {
      const key = `${uuidv4()}.${image.originalname.split('.').pop()}`;
      console.log('kkkk', key);

      const result = await this.uploadToCloudinary(image.buffer, key);

      console.log('Successfully uploaded object:', result);
      return {
        imageUrl: result.secure_url,
      };
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new HttpException(
        'Error uploading image',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private uploadToCloudinary(buffer: Buffer, key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const uploadStream = Cloudinary.v2.uploader.upload_stream(
        {
          public_id: key,
          folder: 'uploads',
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );
      uploadStream.end(buffer);
    });
  }
}
