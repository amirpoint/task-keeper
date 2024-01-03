import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum ROLES {
    USER = 'User',
    ADMIN = 'Admin',
}


export enum ROLES {
    USER = 'User',
    ADMIN = 'Admin',
}

@Schema({
    timestamps: true,
})
export class User {

    @Prop({ required: true })
    user_id: number;

    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, default: 'User' })
    admin_perm: ROLES;

    @Prop({ required: false })
    avatar: string;

}

export const UserSchema = SchemaFactory.createForClass(User);