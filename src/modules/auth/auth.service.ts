// import { MailerService } from '@src/email/mailer/mailer.service';
// import { SendGridService } from '@src/email/mailer/sendGrid.service';
// auth.service.ts
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
// import { UserType } from '@prisma/client';
import { LoginInput } from './dto/login-user.input';
import { SignupInput } from './dto/signup-user.input';
import { PrismaService } from '@src/prisma/prisma.service';
import { ResetPasswordInput } from './dto/get-token.input';
import { ChangePasswordInput } from './dto/change-password.input';
import { UserType } from '@src/models/global.enum';
import { generateJwtTokens } from '@src/helpers/jwt.helper';
import { MailersendService } from '../mailersend/mailersend.service';
import { ForgotPasswordResponse, UsersAndToken } from './models/user.model';
@Injectable()
export class AuthService {
  private readonly jwtSecret: string = process.env.JWT_SECRET;
  private readonly refreshTokenSecret: string =
    process.env.REFRESH_TOKEN_SECRET;

  constructor(
    private prisma: PrismaService,
    private readonly mailersendService: MailersendService,
    // private readonly mailerService: MailerService,
    // private readonly sendgridService: SendGridService,
  ) {}

  //SignUp Logic
  async signupUser(signupInput: SignupInput): Promise<UsersAndToken> {
    const { email, password, fullName, userType } = signupInput;

    // Check whether email already exists
    const userWithEmail = await this.prisma.user.findFirst({
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
      // Create a new user in the database with isVerified set to false
      const user = await this.prisma.user.create({
        data: {
          email,
          passwordHash,
          fullName,
          userType: userType,
          isVerified: false,
        },
      });

      if (user.email) {
        console.log('user.email', user.email);
        const verificationToken = this.generateVerificationToken(user?.id);
        console.log('verificationToken', verificationToken); //logged
        // await this.mailersendService.sendEmailForVerification(
        //   user?.email,
        //   verificationToken,
        // );
      }

      const { accessToken, refreshToken } = generateJwtTokens(
        user.id,
        user.userType,
        user?.hostelId ?? null,
      );
      console.log('accessToken', accessToken);

      // Save refreshToken in the database
      await this.prisma.user.update({
        where: { id: user.id }, // Specify the user to update
        data: { hashedRefreshToken: refreshToken }, // Update refreshToken field
      });

      return { ...user, token: { accessToken, refreshToken } };
    } catch (error) {
      console.log(error);
      // Handle any database-related errors
      // throw new Error('Error creating user');
    }
  }

  async resendVerificationMail(id: number) {
    try {
      const user = await this.prisma.user.findFirst({ where: { id } });

      const verificationToken = this.generateVerificationToken(user?.id);
      await this.mailersendService.sendEmailForVerification(
        user?.email,
        verificationToken,
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  //Login Logic
  async loginUser(loginInput: LoginInput) {
    const { email, password } = loginInput;

    // Find the user by email
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      // Throw an unauthorized exception if the user is not found
      throw new UnauthorizedException('no user');
    }

    // Check if user is verified
    // if (!user.isVerified) {
    //   throw new UnauthorizedException('Please verify your email before logging in');
    // }

    // Compare the provided password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      // Throw an unauthorized exception if the password is invalid
      throw new UnauthorizedException('Incorrect password');
    }

    // Generate JWT tokens
    const { accessToken, refreshToken } = generateJwtTokens(
      user.id,
      user.userType as UserType,
      user?.hostelId ?? null,
    );
    // Save refreshToken in the database
    await this.prisma.user.update({
      where: { id: user.id },
      data: { hashedRefreshToken: refreshToken },
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        userType: user.userType,
      },
      token: { accessToken, refreshToken },
    };
  }

  async verifyEmail(token: string) {
    try {
      // Verify the token using jwtSecret
      const decoded = jwt.verify(token, this.jwtSecret);

      // Update the user's verification status in the database
      const userId = decoded.sub;
      const user = await this.prisma.user.update({
        where: { id: Number(userId) },
        data: { isVerified: true },
      });

      // Generate new tokens after verification
      const { accessToken, refreshToken } = generateJwtTokens(
        user.id,
        user.userType as UserType,
        user?.hostelId ?? null,
      );

      // Save refreshToken in the database
      await this.prisma.user.update({
        where: { id: user.id },
        data: { hashedRefreshToken: refreshToken },
      });

      return {
        id: user.id,
        token: {
          accessToken,
          refreshToken,
        },
      };
    } catch (error) {
      // Token verification failed
      throw new NotFoundException('token not found');
    }
  }

  async sendResetPasswordLink(email: string): Promise<ForgotPasswordResponse> {
    try {
      // Verify the token using jwtSecret

      const user = await this.prisma.user.findUnique({
        where: { email: email },
      });
      if (!user) {
        throw new NotFoundException('user not found');
      }

      //create a reset link and send through email
      const verificationToken = this.generateVerificationToken(user.id);

      await this.mailersendService.sendEmailForForgotPassword(
        user.email,
        verificationToken,
      );

      // await this.mailerService.sendEmail(
      //   verificationLink,
      //   'ayushthapamgr007@gmail.com',
      //   'hello body',
      // );

      return { id: Number(user.id) }; // Return the decoded user ID
    } catch (error) {
      // Token verification failed
      throw new NotFoundException('user not found');
    }
  }

  async resetPassword(input: ResetPasswordInput): Promise<UsersAndToken> {
    try {
      // Verify the token using jwtSecret
      const decoded = jwt.verify(input.token, this.jwtSecret);

      // Update the user's verification status in the database
      const userId = decoded.sub;

      const userType = UserType.STUDENT; // TODO get userType from the decoded token
      // Hash the password before saving it
      const passwordHash = await bcrypt.hash(input.password, 10);
      const { accessToken, refreshToken } = generateJwtTokens(
        Number(userId),
        userType,
        null,
      );

      const user = await this.prisma.user.update({
        where: { id: Number(userId) },
        data: { passwordHash: passwordHash, hashedRefreshToken: refreshToken },
      });

      return { ...user, token: { accessToken, refreshToken } };
    } catch (error) {
      // Token verification failed
      throw new NotFoundException('token not valid');
    }
  }

  private generateVerificationToken(userId: number) {
    // Generate a token using the user's ID and jwtSecret
    const token = jwt.sign({ sub: userId }, this.jwtSecret, {
      expiresIn: '1 day',
    });
    return token;
  }

  //RefreshToken Logic
  async refreshTokens(refreshToken: string) {
    try {
      const decoded = jwt.verify(refreshToken, this.refreshTokenSecret);
      const userId = decoded.sub;

      const user = await this.prisma.user.findFirst({
        where: { id: Number(userId) },
      });

      // Verify the refresh token's signature

      // Ensure that the refresh token is still valid and matches the stored token
      if (
        typeof decoded === 'object' &&
        user &&
        decoded.hasOwnProperty('sub')
      ) {
        // Generate a new access token with appropriate claims
        // here no need to generate refreshToken so no need to call the function
        const { accessToken, refreshToken } = generateJwtTokens(
          user.id,
          user.userType as UserType,
          user?.hostelId ?? null,
        );

        // Return the new access token
        return { user, token: { accessToken: accessToken, refreshToken } };
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
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
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
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        passwordHash: newPasswordHash,
      },
    });

    // Return a success message or any additional information as needed
    return 'Password changed successfully';
  }
}
