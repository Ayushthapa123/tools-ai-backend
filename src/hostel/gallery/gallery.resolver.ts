import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GalleryService } from './gallery.service';
import { Gallery } from '@src/models/global.model';
import { CreateGalleryInput } from './dtos/create-gallery.input';
import { UpdateGalleryInput } from './dtos/update-gallery.input';

// import { Controller } from '@nestjs/common';

@Resolver(() => Gallery)
// @Controller('hostel') // thats not possible to just create hostel namespace I guess. It must have something
export class GalleryResolver {
  constructor(private readonly galleryService: GalleryService) {}

  @Query(() => [Gallery], { nullable: true })
  async getGalleryByHostelId(
    @Args('hostelId') hostelId: number,
  ): Promise<Gallery[] | null> {
    return this.galleryService.getGAllerysByHostelId(hostelId);
  }

  @Mutation(() => Gallery)
  async createGallery(
    @Args('data') data: CreateGalleryInput,
  ): Promise<Gallery> {
    return this.galleryService.createGallery(data);
  }

  @Mutation(() => Gallery)
  async updateGallery(
    @Args('galleryId') galleryId: number,
    @Args('data') data: UpdateGalleryInput,
  ): Promise<Gallery> {
    return this.galleryService.updateGallery(galleryId, data);
  }
}
