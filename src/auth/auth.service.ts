import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt/dist";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Role, User } from "src/common/schemas/user.schema";
import { SignInDto } from "./dto/signin.dto";
import * as bcrypt from "bcrypt";
import { Tokens } from "../common/types";
import { ForbiddenException } from "@nestjs/common/exceptions/forbidden.exception";
import { throwIfEmpty } from "rxjs";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService,
    ) { }


    async signIn(signInDto: SignInDto): Promise<Tokens> {

        const { username, password } = signInDto;

        const user = await this.userModel.findOne({ username });

        if (!user) {
            throw new UnauthorizedException('Invalid email or password.');
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
            throw new UnauthorizedException('Invalid email or password.');
        }

        const tokens = await this.getTokens(user.username, user.role);
        await this.updateRToken(user.username, tokens.refresh_token);

        return tokens;
    }

    async signOut(username: string) {
        await this.userModel.updateMany({username}, {hashedRT: null});
    }


    async getTokens(username: string, role: Role) : Promise<Tokens>{
        // const secret = {inject: [ConfigService],
        // useFactory: (config: ConfigService) => { return { secret: config.get<string>('JWT_SECRET') }}}

        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.sign(
                {username, role}, {secret: 'accesstokensecret', expiresIn: 60 * 15})
                , this.jwtService.sign(
                {username, role}, {secret: 'refreshtokensecret', expiresIn: 60 * 60 * 24 * 7})
            ]);
            
        return {access_token, refresh_token}
    }

    async updateRToken(username: string, refresh_token: string) {
        // const user = await this.userModel.findOne({ username });
        // if (!user || user.hashedRT) throw new ForbiddenException('Access Denied.')

        const hashedRT = await bcrypt.hash(refresh_token, 10);

        await this.userModel.updateOne({username}, {
            $set: {
                hashedRT
            }
        });
    }

}