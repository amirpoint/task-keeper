import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { Roles } from "src/common/decorators/roles.decorator";
import { RolesGuard } from "src/common/roles.guard";
import { Role, User } from "src/common/schemas/user.schema";
import { AuthGuard } from "src/common/strategy";
import { AddNewUserDto } from "./dto/addnewuser.dto";
import { UpdateUserDto } from "./dto/updateuser.dto";
import { UsersService } from "./users.service";

@Controller('dashboard')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Post('users')
    addNewUser(@Body() addNewUserDto: AddNewUserDto): Promise<User> {
        return this.usersService.addNewUser(addNewUserDto);
        
    }
    
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Get('users/:username')
    getUser(@Param() params: any): Promise<User> {
        
        return this.usersService.getUser(params.username);
        
    }
    
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Patch('users/:username')
    updateUser(
        @Param() username: object,
        @Body() updateUserDto: UpdateUserDto
        ): Promise<User> {
            return this.usersService.updateUser(username, updateUserDto);
            
        }
        
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Delete('users/:username')
    deleteUser(@Param() username: object): Promise<{ msg }> {
        return this.usersService.deleteUser(username);

    }

}