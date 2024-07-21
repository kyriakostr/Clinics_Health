import { Clinic } from "src/entities/clinic.entity";
import { HealthRecord } from "src/entities/healthrecord.entity";
import { User } from "src/entities/user.entity";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const config:PostgresConnectionOptions={
    type:"postgres",
    database:"clinics_health",
    host:"localhost",
    port:5432,
    username:"postgres",
    password:"postgres",
    entities:[User,Clinic,HealthRecord],
    synchronize:true
    
}

export default config;