import {
  Controller,
  Post,
  HttpException,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
// import * as AWS from 'aws-sdk';


import { v4 as uuidv4 } from 'uuid'; // Import UUID generator


import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import * as dotenv from 'dotenv'; // Import dotenv to access environment variables

dotenv.config(); // Load environment variables from .env file if present

@Controller('upload/image')
export class ImageController {
  constructor() {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() image: any) {
    console.log('iii', image);
    try {
      const s3Client = new S3Client({
        endpoint: 'https://blr1.digitaloceanspaces.com',
        region: 'blr1', // Assuming your DigitalOcean Spaces is in the NYC3 region
        credentials: {
          accessKeyId: 'DO00ZBH74KWTYP4Z8X98',
          secretAccessKey: 'nddGcxyx2f8TpkamcMli5LkBV1/H8TMZOV0cm2F85B8',
        },
      });

      // const params = {
      //   Bucket: 'example-space', // Replace with your DigitalOcean Space name
      //   Key: `folder-path/${uuidv4()}.jpg`, // Unique key for the uploaded image
      //   Body: image.buffer,
      //   ContentType: image.mimetype, // Set content type based on uploaded file's mimetype
      //   ACL: 'public-read', // Make uploaded image publicly accessible
      //   Metadata: {
      //     'x-amz-meta-my-key': 'your-value',
      //   },
      // };
      const imageType = String(image.originalname).split('.')[1];
      const key = `${uuidv4()}.${imageType}`;
      console.log('kkkk', key);

      const data = await s3Client.send(
        new PutObjectCommand({
          Bucket: 'storage-101',
          Key: key,
          Body: image.buffer,
          ACL: 'public-read',
        }),
      );
      console.log('Successfully uploaded object:', data);
      return {
        imageUrl: `https://storage-101.blr1.digitaloceanspaces.com/${key}`,
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
