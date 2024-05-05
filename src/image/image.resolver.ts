import { Resolver, Args, Mutation } from '@nestjs/graphql';

import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator
import { DeleteImageModel, UploadImageModel } from './models/image.model';
import { Gallery } from '@src/models/global.model';

@Resolver(() => Gallery)
export class ImageResolver {
  @Mutation(() => UploadImageModel)
  async uploadImage(@Args('file') file): Promise<UploadImageModel> {
    // Configure AWS SDK
    const s3 = new AWS.S3({
      accessKeyId: 'DO00DRWRCUMNXUM4GWTF',
      secretAccessKey: 'YQNFXSxmft8zg2cpxizfLU6c0DdXsKFLo703vvZmd2w',
    });

    const params = {
      Bucket: 'hostel-images',
      Key: uuidv4(),
      Body: file.buffer,
      // ACL: 'public-read', // Set appropriate permissions
    };

    // Upload image to DigitalOcean Spaces
    const result = await s3.upload(params).promise();

    return { url: result.Location }; // Return the URL of the uploaded image
  }

  @Mutation(() => DeleteImageModel)
  async deleteImage(@Args('imageUrl') imageUrl: string) {
    // Configure AWS SDK
    // Configure AWS SDK
    const s3 = new AWS.S3({
      accessKeyId: 'DO00DRWRCUMNXUM4GWTF',
      secretAccessKey: 'YQNFXSxmft8zg2cpxizfLU6c0DdXsKFLo703vvZmd2w',
    });

    const Key = imageUrl.split('/').pop(); // Extract filename from URL

    const params = {
      Bucket: 'hostel-images',
      Key,
    };

    // Delete image from DigitalOcean Spaces
    try {
      await s3.deleteObject(params).promise();
      return { response: true }; // Image deleted successfully
    } catch (error) {
      console.error('Error deleting image:', error);
      return false; // Failed to delete image
    }
  }
}
