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
  private readonly jwtSecret: string = 'your-secret-key'; // Replace with your own secret key
  private readonly refreshTokenSecret: string = 'your-refresh-secret-key'; // Replace with your own secret key for refresh tokens

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

      return user;
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

    // Generate access and refresh tokens
    const tokens = this.generateJwtTokens(user.userId);

    // Return the user and tokens if login is successful
    //! we need to define in schema to be able to access from graphql endpoint.
    //! also save need to save hashedRefreshToken in UserSchema
    return { user, tokens };
  }

  private generateJwtTokens(userId: number) {
    const accessToken = jwt.sign({ sub: userId }, this.jwtSecret, {
      expiresIn: '45m',
    });
    const refreshToken = jwt.sign({ sub: userId }, this.refreshTokenSecret, {
      expiresIn: '30d',
    });
    return { accessToken, refreshToken };
  }

  //RefreshToken Logic
  async refreshTokens(refreshToken: string) {
    try {
      // Verify the refresh token
      const decoded = jwt.verify(refreshToken, this.refreshTokenSecret);

      // If valid, generate a new access token
      const newAccessToken = jwt.sign({ sub: decoded.sub }, this.jwtSecret, {
        expiresIn: '15m',
      });

      // Return the new access token
      return { accessToken: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
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
