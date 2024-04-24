// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { OAuth2Client } from 'google-auth-library';
import * as jwt from 'jsonwebtoken';

import { google } from 'googleapis';
import { GoogleOauthUrl } from './google.model';

@Injectable()
export class GoogleAuthService {
  constructor(private readonly prismaService: PrismaService) {}
  private readonly jwtSecret: string = process.env.JWT_SECRET;
  private readonly refreshTokenSecret: string =
    process.env.REFRESH_TOKEN_SECRET;

  async signUpWithGoogle(code: string) {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = 'http://localhost:3000/oauth/google';

    const client = new OAuth2Client(clientId, clientSecret, redirectUri);

    // Exchange authorization code for access token
    const { tokens } = await client.getToken(code);

    // Make a request to Google's tokeninfo endpoint to retrieve the ID token
    await client.setCredentials(tokens);

    const tokenId = client.credentials.id_token;
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: clientId,
    });
    const payload = ticket.getPayload();
    const email = payload.email;
    const name = payload.given_name + ' ' + payload.family_name;

    // Check if user already exists in the database
    let user = await this.prismaService.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      // Create user if not exists
      user = await this.prismaService.users.create({
        data: {
          email,
          fullName: name,
          userType: 'STUDENT',
        },
      });
      // Generate JWT token
      const token = this.generateJwtTokens(user.userId);
      return { ...user, token: token };
    } else {
      const token = this.generateJwtTokens(user.userId);
      return { ...user, token: token };
    }
  }

  async getGoogleAuthUrl(): Promise<GoogleOauthUrl> {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'http://localhost:3000/oauth/google',
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

  private generateJwtTokens(userId: number) {
    const accessToken = jwt.sign({ sub: userId }, this.jwtSecret, {
      expiresIn: '50m',
    });
    const refreshToken = jwt.sign({ sub: userId }, this.refreshTokenSecret, {
      expiresIn: '30d',
    });
    return { accessToken, refreshToken };
  }
}
