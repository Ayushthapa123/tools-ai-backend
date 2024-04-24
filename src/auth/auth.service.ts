import { MailerService } from '@src/email/mailer/mailer.service';
// auth.service.ts
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { SignupInput } from './dto/signup-user.input';
import { LoginInput } from './dto/login-user.input';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ChangePasswordInput } from './dto/change-password.input';
import { ForgotPasswordInput } from './dto/forgot-password.input';

@Injectable()
export class AuthService {
  private readonly jwtSecret: string = 'Hello@123'; // Replace with your own secret key
  private readonly refreshTokenSecret: string = '!ayushh123#!,'; // Replace with your own secret key for refresh tokens
  private readonly MailerService: MailerService;

  constructor(private prisma: PrismaService) {}

  //SignUp Logic
  async signupUser(signupInput: SignupInput) {
    const { email, password, firstName, lastName } = signupInput;

    // Check whether email already exists
    const userWithEmail = await this.prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (userWithEmail) {
      // Throw a conflict exception if email already exists
      throw new UnauthorizedException('Email already exists');
    }

    // Hash the password before saving it
    const passwordHash = await bcrypt.hash(password, 10);

    try {
      // Create a new user in the database
      const user = await this.prisma.users.create({
        data: {
          email,
          passwordHash,
          firstName,
          lastName,
        },
      });

      if (user.email) {
        console.log(
          'If user is created send mail to the user for verification',
        );
        // await (this.MailerService as MailerService).sendEmail(
        //   'thapaaayush115@gmail.com',
        //   'Hi ayush please verify your email',
        //   'hello',
        // );
      }

      // Generate JWT tokens
      const { accessToken, refreshToken } = this.generateJwtTokens(user.userId);
      // Save refreshToken in the database
      await this.prisma.users.update({
        where: { userId: user.userId }, // Specify the user to update
        data: { hashedRefreshToken: refreshToken }, // Update refreshToken field
      });

      return { ...user, token: { accessToken, refreshToken } };
    } catch (error) {
      // Handle any database-related errors
      throw new Error('Error creating user');
    }
  }

  //Login Logic
  async loginUser(loginInput: LoginInput) {
    const { email, password } = loginInput;

    // Find the user by email
    const user = await this.prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      // Throw an unauthorized exception if the user is not found
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare the provided password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      // Throw an unauthorized exception if the password is invalid
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT tokens
    const { accessToken, refreshToken } = this.generateJwtTokens(user.userId);
    // Save refreshToken in the database
    await this.prisma.users.update({
      where: { userId: user.userId }, // Specify the user to update
      data: { hashedRefreshToken: refreshToken }, // Update refreshToken field
    });

    return { ...user, token: { accessToken, refreshToken } };
  }

  private generateJwtTokens(userId: number) {
    const accessToken = jwt.sign({ sub: userId }, this.jwtSecret, {
      expiresIn: '50m',
    });
    const refreshToken = jwt.sign({ sub: userId }, this.refreshTokenSecret, {
      expiresIn: '30d',
    });
    return { accessToken, refreshToken };
  }

  //RefreshToken Logic
  async refreshTokens(refreshToken: string, userId: number) {
    try {
      // Retrieve the refresh token from your database based on the token received but it's lengthy so comment for now
      const user = await this.prisma.users.findFirst({
        where: { userId: userId },
      });

      // Verify the refresh token's signature
      console.log(refreshToken);
      const decoded = jwt.verify(refreshToken, this.refreshTokenSecret);
      console.log('dddddddd', decoded);

      // Ensure that the refresh token is still valid and matches the stored token
      if (
        typeof decoded === 'object' &&
        user.userId === userId &&
        decoded.hasOwnProperty('sub')
      ) {
        // Generate a new access token with appropriate claims
        const newAccessToken = jwt.sign({ sub: decoded.sub }, this.jwtSecret, {
          expiresIn: '50m', // Set appropriate expiration time
        });

        // Return the new access token
        return { accessToken: newAccessToken, refreshToken };
      } else {
        throw new UnauthorizedException('Invalid refresh tokenn');
      }
    } catch (error) {
      // Handle invalid refresh tokens or other errors
      throw new UnauthorizedException('Invalid refresh token catch error');
    }
  }

  //Change password logic

  async changePassword(
    userId: number,
    changePasswordInput: ChangePasswordInput,
  ) {
    const { currentPassword, newPassword } = changePasswordInput;

    // Find the user by userId
    const user = await this.prisma.users.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Verify the current password
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.passwordHash,
    );

    if (!isCurrentPasswordValid) {
      throw new UnauthorizedException('Invalid current password');
    }

    // Hash the new password before updating it
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    await this.prisma.users.update({
      where: {
        userId: userId,
      },
      data: {
        passwordHash: newPasswordHash,
      },
    });

    // Return a success message or any additional information as needed
    return 'Password changed successfully';
  }

  //Forgot password logic

  async forgotPassword(forgotPasswordInput: ForgotPasswordInput) {
    const { email } = forgotPasswordInput;

    // Find the user by email
    const user = await this.prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Generate a token for resetting the password

    // Send an email to the user with the reset password link, including the resetPasswordToken

    // Return a success message or any additional information as needed
    return 'Reset password email sent successfully';
  }
}
