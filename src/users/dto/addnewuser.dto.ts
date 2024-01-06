import { IsEnum, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { Role } from "src/common/schemas/user.schema";



export class AddNewUserDto {
    
    @IsNotEmpty({ message: 'username is required.'})
    readonly username: string;

    @IsNotEmpty({ message: 'password is required.'})
    @MinLength(8, { message: 'too short pw.'})
    // @MaxLength(16, { message: 'too long pw.'})
    readonly password: string;

    @IsNotEmpty({ message: 'role is required.'})
    @IsEnum(Role)
    readonly role: Role;
    
    readonly avatar: string;


}