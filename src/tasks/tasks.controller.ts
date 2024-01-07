import { Controller } from "@nestjs/common";
import { Body, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common/decorators";
import { GetCurrentUser } from "src/common/decorators/current-user.decorator";
import { Task } from "src/common/schemas/task.schema";
import { AuthGuard } from "src/common/strategy";
import { AddNewTaskDto } from "./dto/addnewtask.dto";
import { TasksService } from "./tasks.service";


@Controller('users/tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @UseGuards(AuthGuard)
    @Post('')
    addNewTask(
        @Body() AddNewTaskDto: AddNewTaskDto,
        @GetCurrentUser() user: any,
    ): Promise<Task> {

        return this.tasksService.addNewTask(user.username, AddNewTaskDto);
    }

    @UseGuards(AuthGuard)
    @Get('')
    getAllTasks(@GetCurrentUser() user: any): Promise<any> {

        return this.tasksService.getAllTasks(user.username);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    getTask(
        @Param() id: string,
        @GetCurrentUser() user: any,
    ): Promise<Task> {

        return this.tasksService.getTask(user.username, id);
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    updateTask(@Param() id: string) {

    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    deleteTask(@Param() id: string) {

    }

}   