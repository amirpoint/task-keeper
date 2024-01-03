import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schemas/user.schema";

const firstUserId = 100;

export class UserId {
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
}