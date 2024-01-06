import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { Roles } from "src/common/decorators/roles.decorator";
import { Role, User } from "src/common/schemas/user.schema";
import { AddNewUserDto } from "./dto/addnewuser.dto";
import { UpdateUserDto } from "./dto/updateuser.dto";
import { UsersService } from "./users.service";

@Controller('dashboard')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post('users')
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles(Role.ADMIN)
    addNewUser(@Body() addNewUserDto: AddNewUserDto): Promise<User> {
        return this.usersService.addNewUser(addNewUserDto);

    }

    @Get('users/:username')
    // @UseGuards(JwtAuthGuard,RolesGuard)
    // @Roles(Role.ADMIN)
    getUser(@Param() params: any): Promise<User> {

        return this.usersService.getUser(params.username);

    }

    @Patch('users/:username')
    // @UseGuards(JwtAuthGuard,RolesGuard)
    // @Roles(Role.ADMIN)
    updateUser(
        @Param() username: object,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<User> {
        return this.usersService.updateUser(username, updateUserDto);

    }

    @Delete('users/:username')
    // @UseGuards(JwtAuthGuard,RolesGuard)
    // @Roles(Role.ADMIN)
    deleteUser(@Param() username: object): Promise<{ msg }> {
        return this.usersService.deleteUser(username);

    }

}