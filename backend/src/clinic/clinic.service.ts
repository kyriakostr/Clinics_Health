import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clinic } from 'src/entities/clinic.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateClinicDTO, UpdateClinicDTO } from './createClinicDto';

@Injectable()
export class ClinicService {

   constructor(@InjectRepository(Clinic) private readonly clinicrepo: Repository<Clinic>){}

   async findall(){
        try {
            return await this.clinicrepo.find();
        } catch (error) {
            return error;
        }
    }
   async findOne(id:number){
        try {
            return await this.clinicrepo.findOne({where:{id:id},relations:['users']})
        } catch (error) {
            return error
        }
   }
   async create(createclinicdto:CreateClinicDTO){
        try {
            const clinic = await this.clinicrepo.create(createclinicdto);
             await this.clinicrepo.save(clinic)
             return await this.findall()
        } catch (error) {
            return error;
        }
    }
    async update(id:number,updateclinicdto:UpdateClinicDTO){
        try {
            
             await this.clinicrepo.update(id,updateclinicdto)
             return await this.findall()
        } catch (error) {
            return error;
        }
    }
    async delete(id:number){
        try {
             await this.clinicrepo.delete(id)
            return await this.findall()
        } catch (error) {
            return error
        }
    }
}

