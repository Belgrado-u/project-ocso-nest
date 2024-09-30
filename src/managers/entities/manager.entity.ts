import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "src/locations/entities/location.entity";

@Entity()
export class Manager {
    @PrimaryGeneratedColumn('uuid')
    managerId:string;
    @Column('text')
    managerFullName:string;
    @Column('float')
    managerSalary:number;
    @Column('text')
    managerEmail:string;
    @Column('text')
    managerPhoneNumber:string;
    //Relacion con Location

    @OneToOne(()=>Location)
    location:Location; 
}
