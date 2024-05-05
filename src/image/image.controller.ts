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

// import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import { v4 as uuidv4 } from 'uuid'; // Import UUID generator

// @Controller('upload/image')
// export class ImageController {
//   constructor() {
//     // Configure AWS SDK with provided accessKeyId and secretAccessKey
//     AWS.config.update({
//       accessKeyId: 'DO00FJK7UWYQ7XXLJ7QJ',
//       secretAccessKey: 'HaULAQh3MiczE2cAYZaUPqba+jX0piwbaMLuSneKfMo',
//     });
//   }

//   @Post()
//   @UseInterceptors(FileInterceptor('image'))
//   async uploadImage(@UploadedFile() image: any) {
//     console.log('iiiiiiiiiiiiii', image);
//     try {
//       //demo
//       const s3Client = new S3Client({
//         endpoint: 'https://nyc3.digitaloceanspaces.com', // Find your endpoint in the control panel, under Settings. Prepend "https://".
//         forcePathStyle: false, // Configures to use subdomain/virtual calling format.
//         region: 'us-east-1', // Must be "us-east-1" when creating new Spaces. Otherwise, use the region in your endpoint (for example, nyc3).
//         credentials: {
//           accessKeyId: 'C58A976M583E23R1O00N', // Access key pair. You can create access key pairs using the control panel or API.
//           secretAccessKey: process.env.SPACES_SECRET, // Secret access key defined through an environment variable.
//         },
//       });
//       // Upload file to AWS S3 bucket
//       const s3 = new AWS.S3();
//       const uploadParams = {
//         Bucket: 'generateds',
//         Key: uuidv4(), // Modify the filename as needed
//         Body: image.buffer, // Use the buffer directly
//       };
//       //demo
//       const data1 = await s3Client.send(new PutObjectCommand(uploadParams));
//       const data = await s3.upload(uploadParams).promise();

//       // Return the URL of the uploaded image
//       return { imageUrl: data.Location.};
//     } catch (error) {
//       console.error('Error uploading image:', error);
//       throw new HttpException(
//         'Error uploading image',
//         HttpStatus.INTERNAL_SERVER_ERROR,
//       );
//     }
//   }
// }

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
        endpoint: 'https://nyc3.digitaloceanspaces.com',
        region: 'us-east-1', // Assuming your DigitalOcean Spaces is in the NYC3 region
        credentials: {
          accessKeyId: 'DO00FJK7UWYQ7XXLJ7QJ',
          secretAccessKey: 'HaULAQh3MiczE2cAYZaUPqba+jX0piwbaMLuSneKfMo',
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
          Bucket: 'hostel-bucket',
          Key: key,
          Body: image.buffer,
          ACL: 'public-read',
        }),
      );
      console.log('Successfully uploaded object:', data);
      return {
        imageUrl: `https://hostel-bucket.nyc3.digitaloceanspaces.com/${key}`,
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
