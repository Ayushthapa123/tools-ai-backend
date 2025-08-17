import { Module } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { ToolService } from './tool.service';
import { ToolResolver } from './tool.resolver';

import { CookieService } from '../auth/services/cookie.service';
import { InputSchemaModule } from './inputSchema/input-schema.module';
@Module({
  imports: [InputSchemaModule],
  providers: [ToolResolver, ToolService, JwtService, CookieService],
})
export class ToolModule {}
