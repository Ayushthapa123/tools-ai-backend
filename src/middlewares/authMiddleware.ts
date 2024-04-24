import { Injectable, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware {
  async use(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();
    if (!ctx.headers.authorization) {
      return null;
    }
    const token = ctx.headers.authorization.split(' ')[1];
    if (!token) {
      return null;
    }
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      ctx.userId = decodedToken.sub;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
