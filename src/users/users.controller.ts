import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/common/jwt.guard";
import { User } from "src/schemas/user.schema";
import { AddNewUserDto } from "./dto/addnewuser.dto";
import { UpdateUserDto } from "./dto/updateuser.dto";
import { UsersService } from "./users.service";

@Controller('dashboard')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Post('users')
    addNewUser(@Body() addNewUserDto: AddNewUserDto): Promise<{ token }> {
        return this.usersService.addNewUser(addNewUserDto);

    }

    @Get('users/:username')
    getUser(@Param() params: any): Promise<User> {
        
        return this.usersService.getUser(params.username);

    }

    @Patch('users/:username')
    updateUser(
        @Param() username : object,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<User> {
        return this.usersService.updateUser(username, updateUserDto);

    }

    @Delete('users/:username')
    deleteUser(@Param() username: object) : Promise<{ msg }> {
        return this.usersService.deleteUser(username);

    }

}