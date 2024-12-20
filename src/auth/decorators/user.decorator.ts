import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user) {
      throw new InternalServerErrorException(
        'USER_NOT_FOUND_IN_REQUEST. (AuthGuard called?)',
      );
    }
    return request.user;
  },
);
