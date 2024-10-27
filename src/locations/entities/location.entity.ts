import { ApiProperty } from "@nestjs/swagger";
import { Employee } from "src/employees/entities/employee.entity"; 
import { Manager } from "src/managers/entities/manager.entity";
import { Region } from "src/regions/entities/region.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Location {
    @PrimaryGeneratedColumn('increment')
    locationId:number;

    @ApiProperty({
        default:"OCSO Juriquilla"
    })
    @Column('text')
    locationName:string;

    @ApiProperty({
        default:" Avenida Tal,S/N,75220"
    })
    @Column('text')
    locationAddress:string;

    @ApiProperty({
        default:[12,12]
    })
    @Column('simple-array')
    locationLatLng:number[];

    @ApiProperty({default:"yywywyyw6263782-233223-392032hdwhwbx"})
    @OneToOne(()=>Manager,{
        eager:true,
    })
    @JoinColumn({
        name:"managerId"
    })
    manager:Manager | string;

    @ManyToOne(()=>Region,(region)=>region.locations)
    @JoinColumn({
        name:"regionId"
    })
    region:Region;

    @OneToMany(()=>Employee,(employee)=>employee.location)
    employees:Employee[];

}