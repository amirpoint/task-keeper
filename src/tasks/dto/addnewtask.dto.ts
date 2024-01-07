import { IsEnum, IsNotEmpty } from "class-validator";
import { Priority } from "src/common/schemas/task.schema";

export class AddNewTaskDto {

    @IsNotEmpty({ message: 'name is required.' })
    readonly name: string;

    @IsNotEmpty({ message: 'priority is required.' })
    @IsEnum(Priority)
    readonly priority: Priority;

    readonly status: string;

    readonly duration: number;


}