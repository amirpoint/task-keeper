import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { ExtractJwt } from "passport-jwt";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: {
                inject: [ConfigService],
                useFactory: (config: ConfigService) => {
                    return { secret: config.get<string>('JWT_SECRET') }
                }
            }
        })
    }

    async validate(payload: any) {
        return {
            username: payload.name,
            admin_perm: payload.role,
        }
    }
}