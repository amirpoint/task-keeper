import { Controller, UploadedFile } from "@nestjs/common";
import { Body, Delete, Get, Param, Patch, Post, UseGuards, UseInterceptors } from "@nestjs/common/decorators";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { GetCurrentUser } from "src/common/decorators/current-user.decorator";
import { Task } from "src/common/schemas/task.schema";
import { AuthGuard } from "src/common/strategy";
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
    @UseGuards(AuthGuard)
    @Post('')
    addNewTask(
        @Body() AddNewTaskDto: AddNewTaskDto,
        @GetCurrentUser() user: any,
        @UploadedFile() file: any
    ): Promise<Task> {
        
        return this.tasksService.addNewTask(user.username, AddNewTaskDto, file);
    }

    @UseGuards(AuthGuard)
    @Get('')
    getAllTasks(@GetCurrentUser() user: any): Promise<any> {

        return this.tasksService.getAllTasks(user.username);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    getTask(
        @Param() id: number,
        @GetCurrentUser() user: any,
    ): Promise<Task> {

        return this.tasksService.getTask(user.username, id);
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    updateTask(
        @Body() updateTaskDto: UpdateTaskDto,
        @Param() id: number,
        @GetCurrentUser() user: any,
    ): Promise<Task> {

        return this.tasksService.updateTask(user.username, id, updateTaskDto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    deleteTask(
        @Param() id: number,
        @GetCurrentUser() user: any,
    ): Promise<{ msg: string }> {

        return this.tasksService.deleteTask(user.username, id)

    }

}   