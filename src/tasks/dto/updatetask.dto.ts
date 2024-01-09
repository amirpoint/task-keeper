import { IsEnum } from "class-validator";
import { Priority } from "src/common/schemas";

export class UpdateTaskDto {

    readonly name: string;

    @IsEnum(Priority)
    readonly priority: Priority;

    readonly status: string;

    readonly duration: number;

}