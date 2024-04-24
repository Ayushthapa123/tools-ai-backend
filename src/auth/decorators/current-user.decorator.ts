import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Users } from '@src/users/models/users.model';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): Users => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
