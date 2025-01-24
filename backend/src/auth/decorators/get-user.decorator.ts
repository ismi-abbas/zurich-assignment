import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new Error('User not found in request');
    }

    if (data) {
      if (!(data in user)) {
        throw new Error(`Property ${data} not found in user object`);
      }
      return user[data as keyof typeof user];
    }
    return user;
  },
);
