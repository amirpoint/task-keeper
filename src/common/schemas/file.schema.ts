import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({})
export class File {

    @Prop({ required: true })
    attachedTo: number;

    @Prop({ required: true })
    path: string;

}

export const FileSchema = SchemaFactory.createForClass(File);