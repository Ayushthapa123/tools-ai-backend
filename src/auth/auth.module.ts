import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.controller';
import { PrismaService } from '@src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@src/email/mailer/mailer.service';
import { EmailModule } from '@src/email/email.module';
import { GoogleAuthResolver } from './oauth/google/googleauth.controller';
import { GoogleAuthService } from './oauth/google/googleauth.service';

@Module({
  imports: [EmailModule], // Include EmailModule if needed
  providers: [
    AuthResolver,
    GoogleAuthResolver,
    GoogleAuthService,
    AuthService,
    PrismaService,
    JwtService,
    MailerService,
  ],
})
export class AuthModule {}
