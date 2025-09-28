import { IsNotEmpty, IsString, MinLength } from "class-validator";


export class SignInDto {         

    @IsString()
    @MinLength(4)
    readonly username: string;

    @IsString()
    @MinLength(8)
    readonly password: string;

}