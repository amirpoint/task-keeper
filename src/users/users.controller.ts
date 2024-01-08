import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors, UseGuards } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Roles } from "src/auth/roles.decorator";
import { RolesGuard } from "src/common/roles.guard";
import { Role, User } from "src/common/schemas/user.schema";
import { AuthGuard } from "src/common/strategy";
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
    @UseGuards(AuthGuard, RolesGuard)
    @Post('users')
    @Roles(Role.ADMIN)
    addNewUser(
        @Body() addNewUserDto: AddNewUserDto,
        @UploadedFile() file: any
    ): Promise<User> {
        return this.usersService.addNewUser(addNewUserDto, file);

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