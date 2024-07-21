import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Clinic } from "./clinic.entity";
import { HealthRecord } from "./healthrecord.entity";


@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable:false})
    name:string

    @Column({nullable:false,unique:true})
    email:string

    @Column() // Define clinicId directly
    clinicId: number;

    @ManyToOne(type=>Clinic,clinic=>clinic.users,{
        onDelete:"CASCADE"
    })
    @JoinColumn({name:'clinicId'})
    clinic:Clinic[]

    @OneToMany(type=>HealthRecord,healthrrecord=>healthrrecord.user)
    healthrecords:HealthRecord

    // clinicid:number
}