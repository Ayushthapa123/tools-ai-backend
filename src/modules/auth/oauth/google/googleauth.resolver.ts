// src/auth/auth.resolver.ts

import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { GoogleAuthService } from './googleauth.service';
import { GoogleOauthUrl } from './google.model';
import { SignupWithGoogleInput } from './google.dto';
import { UsersAndToken } from '@src/modules/auth/models/user.model';
import { Response, Request } from 'express';
@Resolver()
export class GoogleAuthResolver {
  constructor(private readonly authService: GoogleAuthService) {}

  @Mutation(() => UsersAndToken)
  async signUpWithGoogle(
    @Args('input') input: SignupWithGoogleInput,
    @Context() context: { res: Response; req: Request },
  ) {
    console.log('ddddddddddddomain', context.req.headers.host); // it logged it's own domain. I want to get the domain of the user
    console.log('userdomain', context.req.headers.referer);
    const userDomain = context.req.headers.referer;
    const token = await this.authService.signUpWithGoogle(
      input.token,
      context.res,
      userDomain,
    );
    return token;
  }

  @Query(() => GoogleOauthUrl)
  async getGoogleAuthUrl(
    @Context() context: { req: Request },
  ): Promise<GoogleOauthUrl> {
    const userDomain = context.req.headers.referer;
    return this.authService.getGoogleAuthUrl(userDomain);
  }
}
