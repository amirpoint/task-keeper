import { IsEnum, IsNotEmpty } from "class-validator";
import { Role } from "src/common/schemas";



export class AddNewUserDto {

    @IsNotEmpty({ message: 'username is required.' })
    readonly username: string;

    @IsNotEmpty({ message: 'password is required.' })
    readonly password: string;

    @IsNotEmpty({ message: 'role is required.' })
    @IsEnum(Role)
    readonly role: Role;

}