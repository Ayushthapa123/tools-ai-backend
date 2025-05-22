import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@src/models/global.model';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
