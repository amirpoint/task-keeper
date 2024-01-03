import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { User } from "src/schemas/user.schema";
import { AddNewUserDto } from "./dto/addnewuser.dto";
import { UpdateUserDto } from "./dto/updateuser.dto";
import { UsersService } from "./users.service";

@Controller('dashboard')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post('users')
    addNewUser(@Body() addNewUserDto: AddNewUserDto): Promise<{ token }> {
        return this.usersService.addNewUser(addNewUserDto);

    }

    @Get('users/:username')
    getUser(@Param() username): Promise<User> {
        return this.usersService.getUser(username);

    }

    @Patch('users/:username')
    updateUser(
        @Param() username : string,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<User> {
        return this.usersService.updateUser(username, updateUserDto);

    }

    @Delete('users/:username')
    deleteUser(@Param() username: string) : Promise<{ msg }> {
        return this.usersService.deleteUser(username);

    }

}