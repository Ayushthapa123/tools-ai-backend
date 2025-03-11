import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { Users } from '@src/models/global.model';
import { LoginInput } from './dto/login-user.input';
import { SignupInput } from './dto/signup-user.input';
import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { CurrentUser } from './decorators/current-user.decorator';
// import { JwtService } from '@nestjs/jwt';
import { ChangePasswordInput } from './dto/change-password.input';
import { MailerService } from '@src/modules/email/mailer/mailer.service';
import {
  UsersAndToken,
  VerifyEmailResponse,
  UsersHostelIdAndToken,
  ForgotPasswordResponse,
} from './models/user.model';
import {
  GetTokenInput,
  VerifyEmailInput,
  ResetPasswordInput,
} from './dto/get-token.input';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    // private readonly jwtService: JwtService,
    private readonly MailerService: MailerService,
  ) {}

  @Mutation(() => UsersAndToken)
  async signupUser(@Args('input') signupInput: SignupInput) {
    return this.authService.signupUser(signupInput);
  }

  @Mutation(() => UsersAndToken)
  async loginUser(@Args('input') loginInput: LoginInput) {
    return this.authService.loginUser(loginInput);
  }

  @Mutation(() => UsersHostelIdAndToken)
  async refreshTokens(@Args('input') tokenInput: GetTokenInput) {
    // Refresh access token using refresh token
    const tokens = await this.authService.refreshTokens(
      tokenInput.refreshToken,
    );

    // Return the new access token
    return tokens;
  }

  @Mutation(() => VerifyEmailResponse)
  async verifyEmail(@Args('input') token: VerifyEmailInput) {
    // Refresh access token using refresh token
    const tokens = await this.authService.verifyEmail(token.token);

    // Return the new access token
    return tokens;
  }

  @Mutation(() => ForgotPasswordResponse)
  async forgotPassword(@Args('email') email: string) {
    // Refresh access token using refresh token
    const res = await this.authService.sendResetPasswordLink(email);

    // Return the new access token
    return res;
  }

  @Mutation(() => UsersAndToken)
  async resetPassword(@Args('input') resetPasswordInput: ResetPasswordInput) {
    // Refresh access token using refresh token
    const tokens = await this.authService.resetPassword(resetPasswordInput);

    // Return the new access token
    return tokens;
  }

  //Change Password logic
  @Mutation(() => String)
  async changePassword(
    @CurrentUser() user: Users,
    @Args('input') changePasswordInput: ChangePasswordInput,
  ) {
    return this.authService.changePassword(user.userId, changePasswordInput);
  }
}
