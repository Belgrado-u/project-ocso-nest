import { IsEmail, IsString, MaxLength } from "class-validator";

export class CreateEmployeesNoSpecDto {
    @IsString()
    @MaxLength(30)
    name: string;
    @IsString()
    @MaxLength(70)
    latName: string;
    @IsString()
    @MaxLength(10)
    phoneNUmber:string;
    @IsString()
    @IsEmail()
    email: string;
}

