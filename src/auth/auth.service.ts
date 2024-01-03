import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt/dist";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schemas/user.schema";
import { SignInDto } from "./dto/signin.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService,
    ) { }


    async signIn(signInDto: SignInDto): Promise<{ token: string }> {

        const { username, password } = signInDto;

        const user = await this.userModel.findOne({ username });

        if (!user) {
            throw new UnauthorizedException('Invalid email or password.');
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
            throw new UnauthorizedException('Invalid email or password.');
        }

        const token = this.jwtService.sign({ id: user._id });

        return { token };
    }

    async signUp(signUpDto): Promise<{ token: string }> {
        const { username, password, admin_perm, avatar } = signUpDto;

        const hashedPassword = await bcrypt.hash(password, 16);

        const user = await this.userModel.create({
            username,
            avatar,
            password: hashedPassword,

        });

        const token = this.jwtService.sign({ id: user._id });

        return { token }
    }


}