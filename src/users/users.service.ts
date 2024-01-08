import { Injectable } from "@nestjs/common/decorators";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/common/schemas/user.schema";
import * as bcrypt from "bcrypt";
import { AddNewUserDto } from "./dto/addnewuser.dto";
import { UpdateUserDto } from "./dto/updateuser.dto";

const firstUserId = 100;

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService,
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

    async addNewUser(addNewUserDto: AddNewUserDto, file): Promise<{ token: string }> {
        const { username, password, admin_perm, avatar } = addNewUserDto;

        const hashedPassword = await bcrypt.hash(password, 10);
        const user_id = await this.getLatestUserId() + 1;

        const user = await this.userModel.create({

            user_id,
            username,
            password: hashedPassword,
            admin_perm,
            avatar: file.filename,

        });

        return user
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
        return user;
    }

    async updateUser(currentUserName: object, updateUserDto: UpdateUserDto): Promise<User> {

        const { password, admin_perm } = updateUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        await this.userModel.updateOne({currentUserName}, {
            $set: {
                password: hashedPassword,
                admin_perm
            }
        });

        const updatedUser = await this.userModel
            .findOne(currentUserName, {
            "_id": 0,
            "__v": 0,
            "createdAt": 0,
            "updatedAt": 0
        });

        return updatedUser;
    }

    async deleteUser(username: object): Promise<{ msg }> {
        await this.userModel.deleteOne(username);

        await this.userModel.deleteOne({ username });

        return { msg: 'Deleted successfully.' }
        // throw new Error("Method not implemented.");
    }
}