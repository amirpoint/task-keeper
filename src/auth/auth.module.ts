import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";



@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.DB_URI),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule{}