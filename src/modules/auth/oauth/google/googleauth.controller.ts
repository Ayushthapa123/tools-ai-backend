// src/auth/auth.resolver.ts

import { GoogleAuthService } from './googleauth.service';

import { Response, Request } from 'express';
import { Controller, Get, Query, Req, Res } from '@nestjs/common';
// import { Context } from '@nestjs/graphql';

@Controller('oauth/google/')
export class GoogleAuthController {
  constructor(private readonly authService: GoogleAuthService) {}

  @Get('url')
  async getGoogleAuthUrl(@Req() req: Request) {
    const userDomain = req.headers.referer;
    return this.authService.getGoogleAuthUrlWithApiRedirect(userDomain);
  }

  @Get('callback')
  async handleGoogleCallback(
    @Res() res: Response,
    @Req() req: Request,
    @Query('code') code: string,
    // @Context() context: { res: Response; req: Request },
  ) {
    console.log('code', code);
    console.log('req', req);
    const userDomain = req.headers.referer;
    console.log('userDomain', userDomain); //undefined
    const token = await this.authService.signUpWithGoogle(
      code,
      res,
      `${process.env.API_URL}/`,
    );
    // return token;
    // Now redirect to a frontend popup page
    res.send(`
      <html>
        <body>
          <script>
            window.opener.postMessage({ type: 'OAUTH_SUCCESS' }, '${process.env.WEB_URL}');
            window.close();
          </script>
        </body>
      </html>
    `);
  }
}
