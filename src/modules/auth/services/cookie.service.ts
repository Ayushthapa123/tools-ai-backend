import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class CookieService {
  private readonly baseCookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'none' as const,
    path: '/',
    maxAge: 0,
  };

  private getCookieDomain(webUrl: string): string {
    try {
      const url = new URL(webUrl);
      let hostname = url.hostname;
      console.log('hostnamehhhh', hostname);

      // Remove 'www.' if present
      if (hostname.startsWith('www.')) {
        console.log('starts with wwww', hostname);
        hostname = hostname.slice(4); // remove first 4 characters
      }
      if (hostname.startsWith('dev.')) {
        console.log('starts with dev', hostname);
        hostname = hostname.slice(4); // remove first 4 characters
      }
      if (hostname.startsWith('api.')) {
        console.log('starts with api', hostname);
        hostname = hostname.slice(4); // remove first 4 characters
      }

      return hostname;
    } catch (error) {
      console.error('Invalid WEB_URL in env:', webUrl);
      return 'localhost';
    }
  }

  setAuthCookies(
    res: Response,
    accessToken: string,
    refreshToken: string,
    userDomain: string,
  ): void {
    const cookieOptionsWithDomain = {
      ...this.baseCookieOptions,
      domain: this.getCookieDomain(userDomain),
    };
    console.log('setting auth cookies', cookieOptionsWithDomain);

    res.cookie('accessToken', accessToken, {
      ...cookieOptionsWithDomain,
      maxAge: process.env.ACCESS_TOKEN_EXPIRATION_TIME
        ? parseInt(process.env.ACCESS_TOKEN_EXPIRATION_TIME)
        : 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.cookie('refreshToken', refreshToken, {
      ...cookieOptionsWithDomain,
      maxAge: process.env.REFRESH_TOKEN_EXPIRATION_TIME
        ? parseInt(process.env.REFRESH_TOKEN_EXPIRATION_TIME)
        : 14 * 24 * 60 * 60 * 1000, // 14 days
    });
  }

  clearAuthCookies(res: Response, userDomain: string): void {
    const cookieOptionsWithDomain = {
      ...this.baseCookieOptions,
      domain: this.getCookieDomain(userDomain),
    };
    console.log('clearing auth cookies', cookieOptionsWithDomain);

    res.clearCookie('accessToken', cookieOptionsWithDomain);
    res.clearCookie('refreshToken', cookieOptionsWithDomain);
  }
}
