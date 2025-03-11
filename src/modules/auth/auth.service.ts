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
import { UserType } from '@prisma/client';
import { LoginInput } from './dto/login-user.input';
import { SignupInput } from './dto/signup-user.input';
import { PrismaService } from '@src/prisma/prisma.service';
import { ResetPasswordInput } from './dto/get-token.input';
import { ChangePasswordInput } from './dto/change-password.input';

@Injectable()
export class AuthService {
  private readonly jwtSecret: string = process.env.JWT_SECRET;
  private readonly refreshTokenSecret: string =
    process.env.REFRESH_TOKEN_SECRET;

  constructor(
    private prisma: PrismaService,
    // private readonly mailerService: MailerService,
    // private readonly sendgridService: SendGridService,
  ) {}

  //SignUp Logic
  async signupUser(signupInput: SignupInput) {
    const { email, password, fullName } = signupInput;

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
          fullName,
        },
      });

      if (user.email) {
        console.log(
          'If user is created send mail to the user for verification',
        );
        // const verificationToken = this.generateVerificationToken(user.userId);
        // const verificationLink = `${process.env.WEB_ADDRESS}/verify-email?token=${verificationToken}`;

        // await this.mailerService.sendEmail(
        //   verificationLink,
        //   'ayushthapamgr007@gmail.com',
        //   'hello body',
        // );
        // await this.sendgridService.sendEmail(verificationLink);
      }

      console.log('uuuuuuuuu', user);
      // Generate JWT tokens
      const { accessToken, refreshToken } = this.generateJwtTokens(
        user.userId,
        user.hostelId,
        user.userType,
      );
      // Save refreshToken in the database
      await this.prisma.users.update({
        where: { userId: user.userId }, // Specify the user to update
        data: { hashedRefreshToken: refreshToken }, // Update refreshToken field
      });

      return { ...user, token: { accessToken, refreshToken } };
    } catch (error) {
      console.log('eeeeeeeeee', error);
      // Handle any database-related errors
      // throw new Error('Error creating user');
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
    const { accessToken, refreshToken } = this.generateJwtTokens(
      user.userId,
      user.hostelId,
      user.userType,
    );
    // Save refreshToken in the database
    await this.prisma.users.update({
      where: { userId: user.userId }, // Specify the user to update
      data: { hashedRefreshToken: refreshToken }, // Update refreshToken field
    });

    return { ...user, token: { accessToken, refreshToken } };
  }

  async verifyEmail(token: string) {
    try {
      // Verify the token using jwtSecret
      const decoded = jwt.verify(token, this.jwtSecret);

      // Update the user's verification status in the database
      const userId = decoded.sub;
      await this.prisma.users.update({
        where: { userId: Number(userId) },
        data: { isVerified: true },
      });

      return { userId: Number(decoded.sub) }; // Return the decoded user ID
    } catch (error) {
      // Token verification failed
      throw new NotFoundException('token not found');
    }
  }

  async sendResetPasswordLink(email: string) {
    try {
      // Verify the token using jwtSecret

      const user = await this.prisma.users.findUnique({
        where: { email: email },
      });

      //create a reset link and send through email
      const verificationToken = this.generateVerificationToken(user.userId);
      const verificationLink = `${process.env.WEB_ADDRESS}/reset-password?token=${verificationToken}`;

      // await this.mailerService.sendEmail(
      //   verificationLink,
      //   'ayushthapamgr007@gmail.com',
      //   'hello body',
      // );

      return { userId: Number(user.userId) }; // Return the decoded user ID
    } catch (error) {
      // Token verification failed
      throw new NotFoundException('user not found');
    }
  }

  async resetPassword(input: ResetPasswordInput) {
    try {
      // Verify the token using jwtSecret
      const decoded = jwt.verify(input.token, this.jwtSecret);

      // Update the user's verification status in the database
      const userId = decoded.sub;
      // Hash the password before saving it
      const passwordHash = await bcrypt.hash(input.password, 10);
      const { accessToken, refreshToken } = this.generateJwtTokens(
        Number(userId),
        1,
        UserType.HOSTEL_OWNER, // TODO get hostelId as well from here
      );

      const user = await this.prisma.users.update({
        where: { userId: Number(userId) },
        data: { passwordHash: passwordHash, hashedRefreshToken: refreshToken },
      });

      return { ...user, token: { accessToken, refreshToken } };
    } catch (error) {
      // Token verification failed
      throw new NotFoundException('token not found');
    }
  }

  private generateJwtTokens(
    userId: number,
    hostelId: number,
    userType: UserType,
  ) {
    const accessToken = jwt.sign({ sub: userId }, this.jwtSecret, {
      expiresIn: '50m',
    });
    const refreshToken = jwt.sign(
      { sub: userId, hostelId: hostelId },
      this.refreshTokenSecret,
      {
        expiresIn: '30d',
      },
    );
    return { accessToken, refreshToken };
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

      const user = await this.prisma.users.findFirst({
        where: { userId: Number(userId) },
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
        const newAccessToken = jwt.sign(
          {
            sub: decoded.sub,
            hostelId: user.hostelId,
            userType: user.userType,
          },
          this.jwtSecret,
          {
            expiresIn: '50m', // Set appropriate expiration time
          },
        );

        // Return the new access token
        return { user, token: { accessToken: newAccessToken, refreshToken } };
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
}
