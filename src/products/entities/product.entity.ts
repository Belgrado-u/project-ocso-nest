import { Entity,Column,PrimaryGeneratedColumn, IsNull  } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    productId:string;
    @Column({type:"text"})
    productName:string;
    @Column({type:"float"})
    price:number;
    @Column({type:"int"})
    countSeal:number;
    //@Column({type:"uuid"})
    // provider:string;
}
