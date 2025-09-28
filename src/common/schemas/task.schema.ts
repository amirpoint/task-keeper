import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum Priority {
    LOW = 1,
    Medium = 2,
    HIGH = 3,
}

@Schema({
    timestamps: true
})
export class Task {

    @Prop({ required: true })
    taskId: number;

    @Prop({ required: true })
    assignedTo: number;

    @Prop({ required: true })
    name: string;

    @Prop({ required: false })
    priority: Priority;

    @Prop({ required: false, default: 'in progress.' })
    status: string;

    @Prop({ required: false })
    duration: number;

}

export const TaskSchema = SchemaFactory.createForClass(Task);