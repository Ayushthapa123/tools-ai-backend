import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenResolver } from './token.resolver';
import { CookieService } from '../auth/services/cookie.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [TokenResolver, TokenService, CookieService, JwtService],
})
export class TokenModule {}
