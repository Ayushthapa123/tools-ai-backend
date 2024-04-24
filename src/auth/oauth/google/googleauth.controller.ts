// src/auth/auth.resolver.ts

import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { GoogleAuthService } from './googleauth.service';
import { GoogleOauthUrl } from './google.model';
import { SignupWithGoogleInput } from './google.dto';
import { UsersAndToken } from '@src/auth/models/user.model';

@Resolver()
export class GoogleAuthResolver {
  constructor(private readonly authService: GoogleAuthService) {}

  @Mutation(() => UsersAndToken)
  async signUpWithGoogle(@Args('input') input: SignupWithGoogleInput) {
    const token = await this.authService.signUpWithGoogle(input.token);
    return token;
  }

  @Query(() => GoogleOauthUrl)
  async getGoogleAuthUrl(): Promise<GoogleOauthUrl> {
    return this.authService.getGoogleAuthUrl();
  }
}
