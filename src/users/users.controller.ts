import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Roles } from "src/auth/roles.decorator";
import { ROLE, User } from "src/schemas/user.schema";
import { AddNewUserDto } from "./dto/addnewuser.dto";
import { UpdateUserDto } from "./dto/updateuser.dto";
import { UsersService } from "./users.service";
import { diskStorage } from "multer";

@Controller('dashboard')
export class UsersController {
    constructor(private usersService: UsersService) { }


    @UseInterceptors(FileInterceptor('attachedFile', {
        storage: diskStorage({
            destination: './files',
        }),
    }))
    @Post('users')
    @Roles(ROLE.ADMIN)
    addNewUser(
        @Body() addNewUserDto: AddNewUserDto,
        @UploadedFile() file: any
    ): Promise<{ token }> {
        return this.usersService.addNewUser(addNewUserDto, file);

    }

    @Get('users/:username')
    getUser(@Param() username): Promise<User> {
        return this.usersService.getUser(username);

    }

    @Patch('users/:username')
    updateUser(
        @Param() username: string,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<User> {
        return this.usersService.updateUser(username, updateUserDto);

    }

    @Delete('users/:username')
    deleteUser(@Param() username: string): Promise<{ msg }> {
        return this.usersService.deleteUser(username);

    }

}