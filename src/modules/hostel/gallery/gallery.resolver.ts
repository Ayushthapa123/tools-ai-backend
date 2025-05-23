import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GalleryService } from './gallery.service';
import { Gallery, GalleryList } from '@src/models/global.model';
import { CreateGalleryInput } from './dto/create-gallery.dto';
import { UpdateGalleryInput } from './dto/update-gallery.dto';

@Resolver()
export class GalleryResolver {
  constructor(private readonly galleryService: GalleryService) {}

  @Query(() => GalleryList, { nullable: true })
  async getGalleryByHostelId(
    @Args('hostelId', { type: () => Int }) hostelId: number,
  ) {
    const { data, error } =
      await this.galleryService.getGalleryByHostelId(hostelId);
    return { data: data, error };
  }

  @Mutation(() => Gallery)
  async createGallery(@Args('data') data: CreateGalleryInput) {
    const { data: gallery, error } =
      await this.galleryService.createGallery(data);
    return { data: gallery, error };
  }

  @Mutation(() => Gallery)
  async deleteGallery(
    @Args('galleryId', { type: () => Int }) galleryId: number,
  ) {
    const { data, error } = await this.galleryService.deleteGallery(galleryId);
    return { data, error };
  }

  @Mutation(() => Gallery)
  async updateGallery(
    @Args('galleryId', { type: () => Int }) galleryId: number,
    @Args('data') data: UpdateGalleryInput,
  ) {
    const { data: gallery, error } = await this.galleryService.updateGallery(
      galleryId,
      data,
    );
    return { data: gallery, error };
  }

  @Mutation(() => Gallery)
  async selectGallery(
    @Args('galleryId', { type: () => Int }) galleryId: number,
    @Args('hostelId', { type: () => Int }) hostelId: number,
  ) {
    const { data, error } = await this.galleryService.selectGallery(
      galleryId,
      hostelId,
    );
    return { data, error };
  }
}
