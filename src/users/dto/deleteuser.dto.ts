import { IsNotEmpty } from "class-validator";


export class DeleteUserDto {

    @IsNotEmpty({ message: 'username is required.' })
    readonly username: string;

}