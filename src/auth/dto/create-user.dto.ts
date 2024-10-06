import { IsEmail, IsIn, isIn, IsString, MinLength } from "class-validator";
import { User } from "../entities/user.entity";
import { Optional } from "@nestjs/common";

export class CreateUserDto extends User {
    @IsEmail()
    userEmail:string;
    @IsString()
    @MinLength(8)
    userPassword: string;
    @Optional()
    @IsIn(["Admin","Employee","Manager"])
    userRoles: string[];
}
