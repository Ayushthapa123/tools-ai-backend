import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { LoginInput } from './dto/login-user.input';
import { SignupInput } from './dto/signup-user.input';
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { Response, Request } from 'express';
import { UnauthorizedException } from '@nestjs/common';
import { ChangePasswordInput } from './dto/change-password.input';
import { CookieService } from './services/cookie.service';
import * as dotenv from 'dotenv';

import {
  UsersAndToken,
  VerifyEmailResponse,
  UsersHostelIdAndToken,
  ForgotPasswordResponse,
  LogoutResponse,
} from './models/user.model';
import { VerifyEmailInput, ResetPasswordInput } from './dto/get-token.input';

// env is not working in this file so setup env here
dotenv.config();

@Resolver(() => Auth)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
  ) {}

  @Mutation(() => UsersAndToken)
  async signupUser(
    @Args('input') signupInput: SignupInput,
    @Context() context: { res: Response; req: Request },
  ) {
    const result = await this.authService.signupUser(signupInput);
    console.log('result', result);
    this.cookieService.setAuthCookies(
      context.res,
      result.token.accessToken,
      result.token.refreshToken,
      context.req.headers.referer,
    );
    return result;
  }

  @Mutation(() => Boolean)
  async resendVerificationMail(@Args('id') id: number): Promise<boolean> {
    return this.authService.resendVerificationMail(id);
  }

  @Mutation(() => UsersAndToken)
  async loginUser(
    @Args('input') loginInput: LoginInput,
    @Context() context: { req: Request; res: Response },
  ) {
    const domainName = context.req.headers.host;
    console.log('ddddddddddddddddddddddddd', domainName);
    const { user, token } = await this.authService.loginUser(loginInput);
    this.cookieService.setAuthCookies(
      context.res,
      token.accessToken,
      token.refreshToken,
      context.req.headers.referer,
    );
    return { ...user, token };
  }

  @Mutation(() => UsersHostelIdAndToken)
  async refreshTokens(@Context() context: { req: Request; res: Response }) {
    const refreshToken = context.req.cookies.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token found');
    }

    const result = await this.authService.refreshTokens(refreshToken);
    this.cookieService.setAuthCookies(
      context.res,
      result.token.accessToken,
      result.token.refreshToken,
      context.req.headers.referer,
    );
    return result;
  }

  @Mutation(() => VerifyEmailResponse)
  async verifyEmail(
    @Args('input') token: VerifyEmailInput,
    @Context() context: any,
  ): Promise<VerifyEmailResponse> {
    const result = await this.authService.verifyEmail(token.token);
    this.cookieService.setAuthCookies(
      context.res,
      result.token.accessToken,
      result.token.refreshToken,
      context.req.headers.referer,
    );
    return { id: result.id };
  }

  @Mutation(() => ForgotPasswordResponse)
  async forgotPassword(@Args('email') email: string) {
    return this.authService.sendResetPasswordLink(email);
  }

  @Mutation(() => UsersAndToken)
  async resetPassword(
    @Args('input') resetPasswordInput: ResetPasswordInput,
    @Context() context: { res: Response; req: Request },
  ): Promise<UsersAndToken> {
    const result = await this.authService.resetPassword(resetPasswordInput);
    this.cookieService.setAuthCookies(
      context.res,
      result.token.accessToken,
      result.token.refreshToken,
      context.req.headers.referer,
    );
    return result;
  }

  @Mutation(() => String)
  async changePassword(
    @Args('userId') userId: number,
    @Args('input') changePasswordInput: ChangePasswordInput,
  ) {
    return this.authService.changePassword(userId, changePasswordInput);
  }

  @Mutation(() => LogoutResponse)
  async logout(@Context() context: { res: Response; req: Request }) {
    this.cookieService.clearAuthCookies(
      context.res,
      context.req.headers.referer,
    );
    return { success: true, message: 'Logged out successfully' };
  }
}
