import { IsNumber, MaxLength, MinLength, IsEnum } from "class-validator";
import { ROLES } from "src/schemas/user.schema";

export class UpdateUserDto {

    @IsNumber()
    readonly user_id: number;
    
    readonly username: string;

    @MinLength(8, { message: 'too short pw.'})
    @MaxLength(16, { message: 'too long pw.'})
    readonly password: string;

    @IsEnum(ROLES)
    readonly admin_perm: ROLES;
}