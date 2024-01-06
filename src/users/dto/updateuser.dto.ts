import { MinLength, IsEnum } from "class-validator";
import { Role } from "src/common/schemas/user.schema";

export class UpdateUserDto {

    // readonly username: string;

    @MinLength(8, { message: 'too short pw.'})
    readonly password: string;

    @IsEnum(Role)
    readonly admin_perm: Role;
}