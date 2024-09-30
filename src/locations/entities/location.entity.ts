import { EmployeesNoSpec } from "src/employees--no-spec/entities/employees--no-spec.entity";
import { Manager } from "src/managers/entities/manager.entity";
import { Region } from "src/regions/entities/region.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Location {
    @PrimaryGeneratedColumn('increment')
    locationId:number;
    @Column('text')
    locationName:string;
    @Column('text')
    locationAdress:string;
    @Column('simple-array')
    locationLatLng:number[];

    @OneToOne(()=>Manager)
    @JoinColumn({
        name:"managerId"
    })
    manager:Manager;

    @ManyToOne(()=>Region,(region)=>region.locations)
    @JoinColumn({
        name:"regionId"
    })
    region:Region;

    @OneToMany(()=>EmployeesNoSpec,(employee)=>employee.location)
    employees:EmployeesNoSpec[];

}