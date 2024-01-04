import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { JwtPayload } from "src/auth/types";


@Injectable()
export class ATStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: {
                inject: [ConfigService],
                useFactory: (config: ConfigService) => {
                    return { secret: config.get<string>('AT_SECRET') }
                }
            }
        })
    }
    
    async validate(payload: JwtPayload) {
        return payload
    }
}