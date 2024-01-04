import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/common/jwt.guard";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/signin.dto";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(JwtAuthGuard)
    @Post('login')
    signIn(@Body() signInDto: SignInDto): Promise<{ token: string }> {
        return this.authService.signIn(signInDto);
    }

}