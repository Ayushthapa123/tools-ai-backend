// src/auth/auth.resolver.ts

import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { GoogleAuthService } from './googleauth.service';
import { GoogleOauthUrl } from './google.model';
import { SignupWithGoogleInput } from './google.dto';
import { UsersAndToken } from '@src/modules/auth/models/user.model';
import { Response } from 'express';
@Resolver()
export class GoogleAuthResolver {
  constructor(private readonly authService: GoogleAuthService) {}

  @Mutation(() => UsersAndToken)
  async signUpWithGoogle(
    @Args('input') input: SignupWithGoogleInput,
    @Context() context: { res: Response },
  ) {
    const token = await this.authService.signUpWithGoogle(
      input.token,
      context.res,
    );
    return token;
  }

  @Query(() => GoogleOauthUrl)
  async getGoogleAuthUrl(): Promise<GoogleOauthUrl> {
    return this.authService.getGoogleAuthUrl();
  }
}
