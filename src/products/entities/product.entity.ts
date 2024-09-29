import { Provider } from "src/providers/entities/provider.entity";
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, IsNull  } from "typeorm";

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
    @ManyToOne(() => Provider, (provider) => provider.products)
    provider: Provider
}
