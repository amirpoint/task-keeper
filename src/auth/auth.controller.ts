import { Body, Controller, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { GetCurrentUser } from "src/common/decorators/current-user.decorator";
import { ATGuard } from "src/common/guards";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/signin.dto";
import { Tokens } from "../common/types";
import { AuthGuard } from "src/common/strategy";
import { HttpCode, Res } from "@nestjs/common/decorators";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async signIn(@Body() signInDto: SignInDto): Promise<Tokens> {

        return this.authService.signIn(signInDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('logout')
    @UseGuards(AuthGuard)
    async signOut(@GetCurrentUser() user: any) {

        return this.authService.signOut(user.username);
    }

}