import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WallpaperService } from './homestayImage.service';
import { HomestayImage } from '@src/models/global.model';
import { CreateHomestayWallpaperInput } from './dto/create-homestay-wallpaper.dto';
import { UpdateHomestayWallpaperInput } from './dto/update-homestay-wallpaper.dto';

@Resolver()
export class WallpaperResolver {
  constructor(private readonly homestayImageService: WallpaperService) {}

  @Query(() => HomestayImage, { nullable: true })
  async getHomestayWallpaperByHomestayId(
    @Args('homestayId', { type: () => Int }) homestayId: number,
  ): Promise<HomestayImage> {
    const { data, error } =
      await this.homestayImageService.getHomestayWallpaperByHomestayId(
        homestayId,
      );
    return { data, error };
  }

  @Mutation(() => HomestayImage)
  async createHomestayImage(
    @Args('data') data: CreateHomestayWallpaperInput,
  ): Promise<HomestayImage> {
    const { data: homestayImage, error } =
      await this.homestayImageService.createRoomImage(data);
    return { data: homestayImage, error };
  }

  @Mutation(() => HomestayImage)
  async deleteHomestayImage(
    @Args('homestayImageId', { type: () => Int }) homestayImageId: number,
  ): Promise<HomestayImage> {
    const { data, error } =
      await this.homestayImageService.deleteRoomImage(homestayImageId);
    return { data, error };
  }

  @Mutation(() => HomestayImage)
  async updateHomestayImage(
    @Args('homestayImageId', { type: () => Int }) homestayImageId: number,
    @Args('data') data: UpdateHomestayWallpaperInput,
  ): Promise<HomestayImage> {
    const { data: homestayImage, error } =
      await this.homestayImageService.updateRoomImage(homestayImageId, data);
    return { data: homestayImage, error };
  }

  @Mutation(() => HomestayImage)
  async selectHomestayImage(
    @Args('selectHomestayImageId') selectHomestayImageId: number,
    @Args('homestayId') homestayId: number,
  ): Promise<HomestayImage> {
    const { data, error } = await this.homestayImageService.selectHomestayImage(
      selectHomestayImageId,
      homestayId,
    );
    return { data, error };
  }
}
