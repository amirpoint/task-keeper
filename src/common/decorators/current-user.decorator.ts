import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadWithRT } from 'src/common/types';
import { JwtService } from '@nestjs/jwt';

export const GetCurrentUser = createParamDecorator(
  async (data: keyof JwtPayloadWithRT | undefined, context) => {

    const request = context.switchToHttp().getRequest();
    console.log(typeof request['user']);
    return request['user']
  }
  );
