import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest();
            const { authorization }: any = request.headers;
            if (!authorization || authorization.trim() === '') {
                throw new UnauthorizedException('Please provide token');
            }
            const refreshToken = authorization.replace(/bearer/gim, '').trim();
            request['refreshToken'] = refreshToken;
            const resp = await this.validateToken(refreshToken);
            request['user'] = resp;
            
            return true;
        } catch (error) {
            console .log('auth error - ', error.message);
            throw new ForbiddenException(error.message || 'Session expired! Please sign in.');
        }
    }

    validateToken(token: string) {
        return this.jwtService.verify(token, {
            secret : process.env.REFRESH_TOKEN_SECRET
        });
    }


}