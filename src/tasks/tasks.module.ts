import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { MulterModule } from "@nestjs/platform-express";
import { FileSchema, TaskSchema, UserSchema } from "src/common/schemas";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";


@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({}),
        MulterModule.register({ dest: './file/' }),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]),
        MongooseModule.forFeature([{ name: 'File', schema: FileSchema }]),
    ],
    controllers: [TasksController],
    providers: [TasksService]
})
export class TaskModule { }