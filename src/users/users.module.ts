import { Module } from "@nestjs/common/decorators";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { ATStrategy, RTStrategy } from "src/common/strategy";
import { JwtStrategy } from "src/common/jwt.strategy";
import { UserSchema } from "src/schemas/user.schema";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";


@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt'}),
        JwtModule.register({}),
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.DB_URI),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ],
    controllers: [UsersController],
    providers: [UsersService, ATStrategy, RTStrategy],
})
export class UserModule {

}