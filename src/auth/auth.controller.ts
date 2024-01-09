import { Body, Controller, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/signin.dto";
import { Tokens } from "../common/types";
import { AccessTokenGuard, RefreshTokenGuard } from "src/common/guards";
import { HttpCode } from "@nestjs/common/decorators";
import { GetCurrentUser, GetRefreshToken } from "src/common/decorators";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }


    @Post('login')
    async signIn(@Body() signInDto: SignInDto): Promise<Tokens> {
        return this.authService.signIn(signInDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('logout')
    @UseGuards(AccessTokenGuard)
    async signOut(@GetCurrentUser() validate: any) {

        return this.authService.signOut(validate.username);
    }

    @Post('refresh')
    @UseGuards(RefreshTokenGuard)
    async refresh(
        @GetCurrentUser() validate: any,
        @GetRefreshToken() refreshToken: any,
    ): Promise<Tokens> {
        return this.authService.refresh(validate.username, refreshToken)
    }

}