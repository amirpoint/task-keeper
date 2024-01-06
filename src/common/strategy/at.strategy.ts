import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest();
            const { authorization }: any = request.headers;
            if (!authorization || authorization.trim() === '') {
                throw new UnauthorizedException('Please provide token');
            }
            const authToken = authorization.replace(/bearer/gim, '').trim();

            const resp = await this.validateToken(authToken);
            request['user'] = resp;
            
            return true;
        } catch (error) {
            console .log('auth error - ', error.message);
            throw new ForbiddenException(error.message || 'session expired! Please sign In');
        }
    }

    validateToken(token: string) {
        return this.jwtService.verify(token, {
            secret : 'accesstokensecret'
        });
    }


}