import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { get } from "http";


@Controller('dashboard')
export class UsersController {
    
    @Post('users')
    addNewUser() {

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