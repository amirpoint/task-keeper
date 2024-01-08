import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt/dist";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Role, User } from "src/common/schemas";
import { SignInDto } from "./dto/signin.dto";
import * as bcrypt from "bcrypt";
import { Tokens } from "../common/types";

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
        console.log('signout func');
        
        await this.userModel.updateMany({username}, {hashedRT: null});
    }
    
    async refresh(username: string, refresh_token) : Promise<Tokens> {
        const user = await this.userModel.findOne({ username });
        const hashedRTMatched = await bcrypt.compare(refresh_token, user.hashedRT)
        if (!hashedRTMatched) {
            throw new UnauthorizedException('Does not match refresh tokens.');
        }

        return this.getTokens(user.username, user.role);

    }

    async getTokens(username: string, role: Role) : Promise<Tokens>{

        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.sign(
                {username, role}, {secret: process.env.ACCESS_TOKEN_SECRET, expiresIn: process.env.ACCESS_TOKEN_EXPIRE})
                , this.jwtService.sign(
                {username, role}, {secret: process.env.REFRESH_TOKEN_SECRET, expiresIn: process.env.REFRESH_TOKEN_EXPIRE})
            ]);
            
        return {access_token, refresh_token}
    }

    async updateRToken(username: string, refresh_token: string) {
        const hashedRT = await bcrypt.hash(refresh_token, 10);

        await this.userModel.updateOne({username}, {
            $set: {
                hashedRT
            }
        });
    }


}