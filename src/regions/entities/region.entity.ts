import { text } from "stream/consumers";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Region {
    @PrimaryGeneratedColumn('increment')
    regionId:number;
    @Column({
        type:'text',
        unique:true
    })
    regionName:string;
    @Column('array')
    regionStates:string[];
}
