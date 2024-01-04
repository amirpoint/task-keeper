import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";

@Injectable()
export class RTStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: {
                inject: [ConfigService],
                useFactory: (config: ConfigService) => {
                    return { secret: config.get<string>('RT_SECRET') }
                }
            }, passReqToCallBack: true,
        });
    }

    async validate(req: Request,payload: any) {
        const refresh_token = req.get('authorization').replace('Bearer', '').trim();
        return { ...payload, refresh_token}
    }
}