import { IsNumber, MaxLength, MinLength, IsEnum } from "class-validator";
import { ROLES } from "src/schemas/user.schema";

export class UpdateUserDto {

    // readonly username: string;

    @MinLength(8, { message: 'too short pw.'})
    readonly password: string;

    @IsEnum(ROLES)
    readonly admin_perm: ROLES;
}