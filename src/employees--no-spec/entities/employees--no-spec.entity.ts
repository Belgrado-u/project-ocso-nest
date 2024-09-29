import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EmployeesNoSpec {
    @PrimaryGeneratedColumn('uuid')
    employeeId: string;
    @Column('text')
    name: string;
    @Column('text')
    lastName: string;
    @Column('text')
    phoneNUmber:string;
    @Column('text')
    email:string;
}
