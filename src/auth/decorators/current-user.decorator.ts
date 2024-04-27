import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Users } from '@src/models/global.model';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): Users => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
