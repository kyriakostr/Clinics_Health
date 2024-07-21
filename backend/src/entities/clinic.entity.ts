import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";


@Entity('clinics')
export class Clinic{
    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable:false})
    name:string

    @Column({nullable:false})
    adress:string

    @Column()
    phone:string

    @Column({nullable:false,unique:true})
    email:string

    @OneToMany(() => User, (user) => user.clinic) // Define the one-to-many relationship
    users: User;
    // clinicid:number
}