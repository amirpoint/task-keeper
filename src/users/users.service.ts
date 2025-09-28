import { Injectable } from "@nestjs/common/decorators";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/common/schemas/user.schema";
import * as bcrypt from "bcrypt";
import { AddNewUserDto } from "./dto/addnewuser.dto";
import { UpdateUserDto } from "./dto/updateuser.dto";
import { HttpException, HttpStatus } from "@nestjs/common";

const firstUserId = 100;

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
    ) { }

    async getLatestUserId() {
        const latestUser = await this.userModel
            .findOne()
            .sort('-user_id');

        if (!latestUser) {
            return firstUserId;
        }

        return latestUser.user_id;
    }

    async addNewUser(addNewUserDto: AddNewUserDto, file): Promise<User> {
        const { username, password, role } = addNewUserDto;

        const hashedPassword = await bcrypt.hash(password, 10);
        const user_id = await this.getLatestUserId() + 1;

        const user = await this.userModel.create({
            user_id,
            username,
            password: hashedPassword,
            role,
            avatar: file.filename,
        });

        return user;
    }

    async getUser(username: string): Promise<User> {
        const user = await this.userModel.findOne({
            username,
        }, {
            "_id": 0,
            "__v": 0,
            "createdAt": 0,
            "updatedAt": 0
        });
        if (!user) throw new HttpException('User not found.', HttpStatus.NOT_FOUND)

        return user;
    }

    async updateUser(currentUserName: string, updateUserDto: UpdateUserDto): Promise<User> {
        
        const currentUser = await this.userModel.findOne({currentUserName})
        if (!currentUser) throw new HttpException('User not found.', HttpStatus.NOT_FOUND)

        const { username, password, admin_perm } = updateUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        await this.userModel.updateOne({ currentUserName }, {
            $set: {
                username,
                password: hashedPassword,
                admin_perm
            }
        });

        const updatedUser = await this.userModel
            .findOne({username}, {
                "_id": 0,
                "__v": 0,
                "createdAt": 0,
                "updatedAt": 0
            });

        return updatedUser;
    }

    async deleteUser(username: string): Promise<{ msg }> {

        await this.userModel.deleteOne({ username });

        return { msg: 'Deleted successfully.' }
    }
}