import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { UserType } from '@prisma/client';
@Injectable()
export class SuperAdminGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const ctx = gqlContext.getContext();

    // Get the access token from cookies or Authorization header
    const accessToken = ctx.req?.cookies?.accessToken;

    if (!accessToken) {
      throw new UnauthorizedException('No access token found');
    }

    try {
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: process.env.JWT_SECRET,
        algorithms: ['HS256'], // Specify the algorithm
      });

      // Verify token expiration
      if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
        throw new UnauthorizedException('Token has expired');
      }

      // Add additional security checks if needed
      if (!payload.sub || !payload.userType) {
        throw new UnauthorizedException('Invalid token payload');
      }
      // Add additional security checks if needed
      if (payload.userType !== UserType.SUPERADMIN) {
        throw new UnauthorizedException('Invalid token payload');
      }

      ctx.user = payload;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid access token');
    }

    return true;
  }
}
