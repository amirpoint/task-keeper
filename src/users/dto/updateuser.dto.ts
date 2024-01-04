import { MinLength, IsEnum } from "class-validator";
import { ROLE } from "src/schemas/user.schema";

export class UpdateUserDto {

    // readonly username: string;

    @MinLength(8, { message: 'too short pw.'})
    readonly password: string;

    @IsEnum(ROLE)
    readonly admin_perm: ROLE;
}