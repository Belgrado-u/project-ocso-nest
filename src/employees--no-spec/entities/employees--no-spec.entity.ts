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
    phoneNumber:string;
    @Column('text')
    email:string;
    @Column({
        type:'text',
        nullable:true
    })
    photoUrl: string;
}
