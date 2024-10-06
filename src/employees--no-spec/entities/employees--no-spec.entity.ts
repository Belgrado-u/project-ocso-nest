import { User } from "src/auth/entities/user.entity";
import { Location } from "src/locations/entities/location.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(()=>Location,(location)=>location.employees)
    @JoinColumn({
        name:"locationId"
    })
    location:Location;

    @OneToOne(()=>User)
    @JoinColumn ({
        name:"userId"
    })
    user:User
}
