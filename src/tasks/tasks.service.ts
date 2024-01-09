import { ForbiddenException } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Task, User, File } from "src/common/schemas";
import { AddNewTaskDto } from "./dto/addnewtask.dto";
import { UpdateTaskDto } from "./dto/updatetask.dto";


const firstTaskId = 100;

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Task.name)
        private taskModel: Model<Task>,
        @InjectModel(User.name)
        private userModel: Model<User>,
        @InjectModel(File.name)
        private fileModel: Model<File>,

    ) { }


    async addNewTask(username: string, addNewTask: AddNewTaskDto, file): Promise<Task> {
        const { name, priority, status, duration } = addNewTask;
        const user = await this.userModel.findOne({ username });
        const taskId = await this.getLatestTaskId() + 1;
        const _file = await this.fileModel.create({
            attachedTo: taskId,
            path: String(file.filename)
        });

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

    async getTask(username: string, taskId: number): Promise<Task> {
        const user = await this.userModel.findOne({ username });
        const task = await this.taskModel.findOne({ taskId, assignedTo: user.user_id });

        if (!task) throw new ForbiddenException('Access Denied.')

        return task;

    }

    async updateTask(username: string, taskId: number, updateTaskDto: UpdateTaskDto): Promise<Task> {

        const user = await this.userModel.findOne({ username });
        const task = await this.taskModel.findOne({ taskId, assignedTo: user.user_id });
        const { name, priority, status, duration } = updateTaskDto;
        if (!task) throw new ForbiddenException('Access Denied.')

        await this.taskModel.updateOne({ taskId }, {
            $set: {
                name,
                priority,
                status,
                duration
            }
        });

        const updatedTask = await this.taskModel.findOne({ taskId }, {
            "_id": 0,
            "__v": 0,
            "createdAt": 0,
            "updatedAt": 0
        });

        return updatedTask;
    }

    async deleteTask(username: string, taskId: number): Promise<{ msg }> {
        const user = await this.userModel.findOne({ username });
        await this.taskModel.deleteOne({ taskId, assignedTo: user.user_id });

        return { msg: 'Deleted successfully.' }
        // throw new Error("Method not implemented.");
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