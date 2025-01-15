import { Exclude } from "class-transformer";

export class UserDto {
    @Exclude()
    id: number;
    @Exclude()
    email: string;
}