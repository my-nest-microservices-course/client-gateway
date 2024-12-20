import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const Token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.token) {
      throw new InternalServerErrorException(
        'TOKEN_NOT_FOUND_IN_REQUEST. (AuthGuard called?)',
      );
    }
    return request.token;
  },
);
