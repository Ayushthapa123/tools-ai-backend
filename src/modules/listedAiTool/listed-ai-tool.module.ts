import { Module } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { ListedAiToolService } from './listed-ai-tool.service';
import { ListedAiToolResolver } from './listed-ai-tool.resolver';

import { CookieService } from '../auth/services/cookie.service';
@Module({
  providers: [
    ListedAiToolResolver,
    ListedAiToolService,
    JwtService,
    CookieService,
  ],
})
export class ListedAiToolModule {}
