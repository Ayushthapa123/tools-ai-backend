// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { GoogleOauthUrl } from './google.model';
import { generateJwtTokens } from '@src/helpers/jwt.helper';
import { UserType } from '@prisma/client';
import { Response } from 'express';
import { CookieService } from '../../services/cookie.service';

@Injectable()
export class GoogleAuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cookieService: CookieService,
  ) {}

  async signUpWithGoogle(code: string, res: Response, userDomain: string) {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = userDomain
      ? `${userDomain}oauth/google/callback`
      : `${process.env.WEB_URL}/oauth/google/callback`;
    console.log('rrrr', redirectUri);

    const client = new OAuth2Client(clientId, clientSecret, redirectUri);
    console.log('client', client);

    // Exchange authorization code for access token
    const { tokens: googleTokens } = await client.getToken(code);
    console.log('googleTokens', googleTokens);
    // Make a request to Google's tokeninfo endpoint to retrieve the ID token
    await client.setCredentials(googleTokens);
    console.log('after token set');

    const tokenId = client.credentials.id_token;
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: clientId,
    });
    const payload = ticket.getPayload();
    const email = payload.email;
    const name = payload.given_name + ' ' + payload.family_name;

    // Check if user already exists in the database
    let user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      // Create user if not exists
      user = await this.prismaService.user.create({
        data: {
          email,
          fullName: name,
          userType: UserType.HOSTEL_OWNER,
          isVerified: true,
        },
      });
    }

    // Generate JWT tokens
    const authTokens = generateJwtTokens(
      user.id,
      UserType.HOSTEL_OWNER,
      user.hostelId,
    );

    // Set cookies using the shared cookie service
    this.cookieService.setAuthCookies(
      res,
      authTokens.accessToken,
      authTokens.refreshToken,
      userDomain,
    );

    // Return user without tokens
    return { ...user, token: authTokens };
  }

  async getGoogleAuthUrl(userDomain: string): Promise<GoogleOauthUrl> {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.API_URL}/oauth/google/callback`,
    );

    //what about name??
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ];

    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: scopes,
    });

    return { url: authUrl };
  }
  async getGoogleAuthUrlWithApiRedirect(
    userDomain: string,
  ): Promise<GoogleOauthUrl> {
    console.log('userDomain', userDomain);
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.API_URL}/oauth/google/callback`,
    );

    //what about name??
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ];

    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: scopes,
    });

    return { url: authUrl };
  }
}
