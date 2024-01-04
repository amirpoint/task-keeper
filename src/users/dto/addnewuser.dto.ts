import { IsEnum, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { ROLE } from "src/schemas/user.schema";



export class AddNewUserDto {
    
    @IsNotEmpty({ message: 'username is required.'})
    readonly username: string;

    @IsNotEmpty({ message: 'password is required.'})
    @MinLength(8, { message: 'too short pw.'})
    @MaxLength(16, { message: 'too long pw.'})
    readonly password: string;

    @IsNotEmpty({ message: 'admin_perm is required.'})
    @IsEnum(ROLE)
    readonly admin_perm: ROLE;
    
    readonly avatar: string;


}