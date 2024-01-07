import { ForbiddenException } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Task } from "src/common/schemas/task.schema";
import { User } from "src/common/schemas/user.schema";
import { AddNewTaskDto } from "./dto/addnewtask.dto";

const firstTaskId = 100;

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Task.name)
        private taskModel: Model<Task>,
        @InjectModel(User.name)
        private userModel: Model<User>,
    ) { }


    async addNewTask(username: string, addNewTask: AddNewTaskDto): Promise<Task> {
        const { name, priority, status, duration } = addNewTask;
        const user = await this.userModel.findOne({ username });
        const taskId = await this.getLatestTaskId() + 1;

        const task = await this.taskModel.create({
            taskId,
            assignedTo: user.user_id,
            name,
            priority,
            status,
            duration
        })

        return task;
    }

    async getAllTasks(username: string): Promise<any> {
        const user = await this.userModel.findOne({ username });
        const tasks = await this.taskModel.find({ assignedTo: user.user_id });
        return tasks;
    }

    async getTask(username, taskId): Promise<Task> {
        const user = await this.userModel.findOne({ username });
        const task = await this.taskModel.findOne({ taskId, assignedTo: user.user_id });

        if (!task) throw new ForbiddenException('Access Denied.')

        return task;

    }


    async updateTask() {

    }

    async deleteTask() {

    }

    async getLatestTaskId() {
        const latestTask = await this.taskModel
            .findOne()
            .sort('-taskId');

        if (!latestTask) {
            return firstTaskId;
        }

        return latestTask.taskId;
    }

}