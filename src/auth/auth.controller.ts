import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { Res } from "@nestjs/common/decorators";
import { Response } from "express";
import { JwtAuthGuard } from "src/common/jwt.guard";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/signin.dto";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @UseGuards(JwtAuthGuard)
    signIn(
        @Body() signInDto: SignInDto,
        @Res({passthrough: true}) res: Response
    ): Promise<{ msg: string }> {
        const token = this.authService.signIn(signInDto);
        const secretData = { token, refreshToken: ''}
        res.cookie('auth-cookie', secretData, {httpOnly: true});
        return { msg: 'success.' }
    }


}