import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { MulterModule } from "@nestjs/platform-express";
import { FileSchema } from "src/common/schemas/file.schema";
import { TaskSchema } from "src/common/schemas/task.schema";
import { UserSchema } from "src/common/schemas/user.schema";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";



@Module({
    imports: [
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.register({}),
    MulterModule.register({dest: './file/'}),
    ConfigModule.forRoot({
        envFilePath: '.env',
        isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]),
    MongooseModule.forFeature([{ name: 'File', schema: FileSchema }]),],
    controllers: [TasksController],
    providers: [TasksService]
})
export class TaskModule {

}