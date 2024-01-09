import { createParamDecorator } from '@nestjs/common';
import { JwtPayloadWithRT } from 'src/common/types';

export const GetCurrentUser = createParamDecorator(
  async (data: keyof JwtPayloadWithRT | undefined, context) => {

    const request = context.switchToHttp().getRequest();
    return request['user']
  }
  );
