import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location {
    @PrimaryGeneratedColumn('increment')
    locationId:number;
    @Column('text')
    locationName:string;
    @Column('text')
    locationAdress:string;
    @Column('array')
    locationLatLng:number[];
}
