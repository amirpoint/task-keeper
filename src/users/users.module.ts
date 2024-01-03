import { Module } from "@nestjs/common/decorators";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";





@Module({
    controllers: [UsersController],
    providers: [UsersService],
})
export class UserModule {

}