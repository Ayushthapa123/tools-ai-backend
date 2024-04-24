import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { Users } from '@src/users/users.model';
import { LoginInput } from './dto/login-user.input';
import { SignupInput } from './dto/signup-user.input';

import { CurrentUser } from './decorators/current-user.decorator';
// import { JwtService } from '@nestjs/jwt';
import { ChangePasswordInput } from './dto/change-password.input';
import { ForgotPasswordInput } from './dto/forgot-password.input';
import { MailerService } from '@src/email/mailer/mailer.service';
import { Token, UsersAndToken } from './models/user.model';
import { GetTokenInput } from './dto/get-token.input';

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

  @Mutation(() => Token)
  async refreshTokens(@Args('input') tokenInput: GetTokenInput) {
    // Refresh access token using refresh token
    const tokens = await this.authService.refreshTokens(
      tokenInput.refreshToken,
      tokenInput.userId,
    );

    // Return the new access token
    return tokens;
  }

  // @UseGuards(JwtAuthGuard)
  @Mutation(() => String)
  async logout(@CurrentUser() user: Users) {
    // You can add any necessary logic for logging out, if needed
    console.log('user just logged out', user);
    return 'Logged out successfully';
  }
  //Change Password logic
  @Mutation(() => String)
  async changePassword(
    @CurrentUser() user: Users,
    @Args('input') changePasswordInput: ChangePasswordInput,
  ) {
    return this.authService.changePassword(user.userId, changePasswordInput);
  }

  //Forgot password logic

  @Mutation(() => String)
  async forgotPassword(
    @Args('input') forgotPasswordInput: ForgotPasswordInput,
  ) {
    return this.authService.forgotPassword(forgotPasswordInput);
  }
}
