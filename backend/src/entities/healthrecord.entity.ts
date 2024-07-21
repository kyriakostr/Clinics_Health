
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";


@Entity('health_records')
export class HealthRecord{
    @PrimaryGeneratedColumn()
    id:number

    

    @Column({nullable:false})
    description:string

    @Column({type:'date'})
    date:Date

    @Column()
    userId:number

    @ManyToOne(type=>User,user=>user.healthrecords,{
        onDelete:"CASCADE"
    })
    @JoinColumn({name:'userId'})
    user:User[]
    
}