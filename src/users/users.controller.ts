import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/common/jwt.guard";
import { Roles } from "src/common/roles.decorator";
import { RolesGuard } from "src/common/roles.guard";
import { User } from "src/schemas/user.schema";
import { AddNewUserDto } from "./dto/addnewuser.dto";
import { UpdateUserDto } from "./dto/updateuser.dto";
import { UsersService } from "./users.service";

@Controller('dashboard')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post('users')
    @UseGuards(RolesGuard)
    @Roles('Admin')
    @UseGuards(JwtAuthGuard)
    addNewUser(@Body() addNewUserDto: AddNewUserDto): Promise<{ token }> {
        return this.usersService.addNewUser(addNewUserDto);

    }

    @Get('users/:username')
    @UseGuards(RolesGuard)
    @Roles('Admin')
    getUser(@Param() params: any): Promise<User> {
        
        return this.usersService.getUser(params.username);

    }

    @Patch('users/:username')
    @UseGuards(RolesGuard)
    @Roles('Admin')
    updateUser(
        @Param() username : object,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<User> {
        return this.usersService.updateUser(username, updateUserDto);

    }

    @Delete('users/:username')
    @UseGuards(RolesGuard)
    @Roles('Admin')
    deleteUser(@Param() username: object) : Promise<{ msg }> {
        return this.usersService.deleteUser(username);

    }

}