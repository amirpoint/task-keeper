import { Controller, UploadedFile } from "@nestjs/common";
import { Body, Delete, Get, Param, Patch, Post, UseGuards, UseInterceptors } from "@nestjs/common/decorators";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { GetCurrentUser } from "src/common/decorators";
import { Task } from "src/common/schemas";
import { AccessTokenGuard } from "src/common/guards";
import { AddNewTaskDto } from "./dto/addnewtask.dto";
import { UpdateTaskDto } from "./dto/updatetask.dto";
import { TasksService } from "./tasks.service";


@Controller('users/tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }


    @UseInterceptors(FileInterceptor('attachedFile', {
        storage: diskStorage({
            destination: './files',
        }),
    }))
    @UseGuards(AccessTokenGuard)
    @Post('')
    addNewTask(
        @Body() AddNewTaskDto: AddNewTaskDto,
        @GetCurrentUser() user: any,
        @UploadedFile() file: any
    ): Promise<Task> {
        
        return this.tasksService.addNewTask(user.username, AddNewTaskDto, file);
    }

    @UseGuards(AccessTokenGuard)
    @Get('')
    getAllTasks(@GetCurrentUser() user: any): Promise<any> {

        return this.tasksService.getAllTasks(user.username);
    }

    @UseGuards(AccessTokenGuard)
    @Get(':id')
    getTask(
        @Param() id: number,
        @GetCurrentUser() user: any,
    ): Promise<Task> {

        return this.tasksService.getTask(user.username, id);
    }

    @UseGuards(AccessTokenGuard)
    @Patch(':id')
    updateTask(
        @Body() updateTaskDto: UpdateTaskDto,
        @Param() id: number,
        @GetCurrentUser() user: any,
    ): Promise<Task> {

        return this.tasksService.updateTask(user.username, id, updateTaskDto);
    }

    @UseGuards(AccessTokenGuard)
    @Delete(':id')
    deleteTask(
        @Param() id: number,
        @GetCurrentUser() user: any,
    ): Promise<{ msg: string }> {

        return this.tasksService.deleteTask(user.username, id)

    }

}   