import { IsInt, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { isFloat32Array } from "util/types";

export class CreateProductDto {
    @IsString()
    @IsUUID("4")
    @IsOptional()
    productId:string;
    @IsString()
    @MaxLength(40)
    productName:string;
    @IsNumber()
    price:number;
    @IsInt()
    countSeal:number;
    @IsString()
    @IsUUID()
    @IsOptional()
    provider:string;

}