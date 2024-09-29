import { IsInt, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { isFloat32Array } from "util/types";
import { Product } from "../entities/product.entity";
//import { Provider } from "@nestjs/common";
import { Provider } from "src/providers/entities/provider.entity";

export class CreateProductDto extends Product{
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
    provider: Provider;
}