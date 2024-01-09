import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum Role {
    USER = 1,
    ADMIN = 2,
}

@Schema({
    timestamps: true,
})
export class User {

    @Prop({ required: true })
    user_id: number;

    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true})
    password: string;
    
    @Prop()
    hashedRT: string;

    @Prop({ required: true, default: 1 })
    role: Role;

    @Prop({ required: false })
    avatar: string;

}

export const UserSchema = SchemaFactory.createForClass(User);