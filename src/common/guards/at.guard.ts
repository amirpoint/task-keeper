import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "@nestjs/passport";
import { ExtractJwt} from "passport-jwt";



export class ATGuard extends AuthGuard('jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: {
                inject: [ConfigService],
                useFactory: (config: ConfigService) => {
                    return { secret: config.get<string>('AT_SECRET') }
                }
            }
        });
    }
}