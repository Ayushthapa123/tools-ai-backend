import {
  Controller,
  Post,
  HttpException,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';

import { v4 as uuidv4 } from 'uuid'; // Import UUID generator

@Controller('upload/image')
export class ImageController {
  constructor() {
    // Configure AWS SDK with provided accessKeyId and secretAccessKey
    AWS.config.update({
      accessKeyId: 'DO00DRWRCUMNXUM4GWTF',
      secretAccessKey: 'YQNFXSxmft8zg2cpxizfLU6c0DdXsKFLo703vvZmd2w',
    });
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() image: any) {
    console.log('iiiiiiiiiiiiii', image);
    try {
      // Upload file to AWS S3 bucket
      const s3 = new AWS.S3();
      const uploadParams = {
        Bucket: 'generateds',
        Key: uuidv4(), // Modify the filename as needed
        Body: image.buffer, // Use the buffer directly
      };
      const data = await s3.upload(uploadParams).promise();

      // Return the URL of the uploaded image
      return { imageUrl: data.Location };
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new HttpException(
        'Error uploading image',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
