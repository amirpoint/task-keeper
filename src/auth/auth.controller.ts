import { Body, Controller, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { Req } from "@nestjs/common/decorators";
import { Request } from "express";
import { GetCurrentUser } from "src/common/decorators/current-user.decorator";
import { ATGuard } from "src/common/guards";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/signin.dto";
import { Tokens } from "../common/types";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    // @UseGuards(JwtAuthGuard)
    async signIn(@Body() signInDto: SignInDto): Promise<Tokens> {

        return this.authService.signIn(signInDto);
    }

    @UseGuards(ATGuard)
    @Post('logout')
    async signOut(@GetCurrentUser('username') username: string) {
        return this.authService.signOut(username);

    }

}