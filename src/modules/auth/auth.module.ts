import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.controller';
// import { EmailModule } from '@src/modules/email/email.module';
import { GoogleAuthService } from './oauth/google/googleauth.service';
// import { MailerService } from '@src/modules/email/mailer/mailer.service';
import { GoogleAuthResolver } from './oauth/google/googleauth.controller';
import { MailersendService } from '../mailersend/mailersend.service';
import { CookieService } from './services/cookie.service';

@Module({
  imports: [], // Include EmailModule if needed
  providers: [
    AuthResolver,
    GoogleAuthResolver,
    GoogleAuthService,
    AuthService,
    JwtService,
    MailersendService,
    CookieService,
    // MailerService,
  ],
})
export class AuthModule {}
