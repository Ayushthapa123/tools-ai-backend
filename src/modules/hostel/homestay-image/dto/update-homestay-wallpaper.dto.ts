import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateHomestayWallpaperInput } from './create-homestay-wallpaper.dto';
import { Injectable } from '@nestjs/common';

@InputType()
export class UpdateHomestayWallpaperInput extends PartialType(
  CreateHomestayWallpaperInput,
) {}
