import { IsNumber, MaxLength, MinLength, IsEnum, ValidateNested } from "class-validator";

export class UpdateUserDto {

    @IsNumber()
    readonly user_id: number;
    
    readonly username: string;

    @MinLength(8, { message: 'too short pw.'})
    @MaxLength(16, { message: 'too long pw.'})
    readonly password: string;

    // @ValidateNested()
    // readonly admin_perm: ROLES;
}