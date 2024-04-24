import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const ctx = gqlContext.getContext();

    // Check if headers exist in the context
    const authorizationHeader = ctx.req?.headers?.authorization;

    if (!authorizationHeader) {
      throw new UnauthorizedException();
    }

    const token = authorizationHeader;
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      ctx.user = payload; // Store the payload in the context for future use
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
