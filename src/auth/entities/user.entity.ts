import { EmployeesNoSpec } from "src/employees--no-spec/entities/employees--no-spec.entity";
import { Manager } from "src/managers/entities/manager.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
        @PrimaryGeneratedColumn('uuid')
        userId:string;
        @Column('text',{
                unique:true,
        })
        userEmail: string;
        @Column('text')
        userPassword: string;
        @Column('simple-array', {
                default: "Employee"
        })
        userRoles:string[];

        @OneToOne(()=>Manager,{
                eager:true
        })
        manager:Manager;

        @OneToOne(()=>EmployeesNoSpec, {
                eager:true
        })
        employee:EmployeesNoSpec;
}