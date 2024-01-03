import { Body, Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { AddNewUserDto } from "./dto/addnewuser.dto";
import { UsersService } from "./users.service";

@Controller('dashboard')
export class UsersController {
    constructor(private usersService: UsersService) {}
    
    @Post('users')
    addNewUser(@Body() addNewUserDto: AddNewUserDto): Promise<{ token }> {
        return this.usersService.addNewUser(addNewUserDto);

    }

    @Get('users/:id')
    getUser() {

    }

    @Patch('users/:id')
    updateUser() {

    }

    @Delete('users/:id')
    deleteUser() {

    }

}