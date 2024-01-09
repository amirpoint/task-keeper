import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors, UseGuards } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Role, User } from "src/common/schemas";
import { AccessTokenGuard } from "src/common/guards";
import { AddNewUserDto } from "./dto/addnewuser.dto";
import { UpdateUserDto } from "./dto/updateuser.dto";
import { UsersService } from "./users.service";
import { diskStorage } from "multer";
import { Roles } from "src/common/decorators";
import { RolesGuard } from "src/common/guards";

@Controller('dashboard')
export class UsersController {
    constructor(private usersService: UsersService) { }


    @UseInterceptors(FileInterceptor('avatar', {
        storage: diskStorage({
            destination: './files',
        }),
    }))
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Post('users')
    addNewUser(
        @Body() addNewUserDto: AddNewUserDto,
        @UploadedFile() file: any
    ): Promise<User> {
        return this.usersService.addNewUser(addNewUserDto, file);
    }

    @UseGuards(AccessTokenGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Get('users/:username')
    getUser(@Param('username') username: string): Promise<User> {
        return this.usersService.getUser(username);
    }

    @UseGuards(AccessTokenGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Patch('users/:username')
    updateUser(
        @Param('username') username: string,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<User> {
        return this.usersService.updateUser(username, updateUserDto);
    }

    @UseGuards(AccessTokenGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Delete('users/:username')
    deleteUser(@Param('username') username: string): Promise<{ msg }> {
        return this.usersService.deleteUser(username);

    }

}