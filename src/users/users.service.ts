import { Injectable } from "@nestjs/common/decorators";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schemas/user.schema";
import * as bcrypt from "bcrypt";
import { AddNewUserDto } from "./dto/addnewuser.dto";




@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService,
    ) { }

    async addNewUser(addNewUserDto: AddNewUserDto): Promise<{ token: string }> {
        const { username, password, admin_perm, avatar } = addNewUserDto;

        const hashedPassword = await bcrypt.hash(password, 16);

        const user = await this.userModel.create({
            // GetLatestUserId()
            user_id: 100,
            username,
            password: hashedPassword,
            admin_perm,
            avatar,

        });

        const token = this.jwtService.sign({ id: user._id });

        return { token }
    }

    async getUser(id): Promise<User> {
        const user = await this.userModel.findOne({
            user_id: id,
        }, {
            "_id": 0,
            "__v": 0
        });

    }
}