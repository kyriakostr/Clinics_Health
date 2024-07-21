import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HealthRecord } from 'src/entities/healthrecord.entity';
import { Repository } from 'typeorm';
import { CreateHealthRecordDTO, UpdateHealthRecordDTO } from './createhealthrecorddto';

@Injectable()
export class HealthRecordsService {
    constructor(@InjectRepository(HealthRecord) private readonly healthrecordrepo: Repository<HealthRecord>){}
   async findall(){
        try {
            return this.healthrecordrepo.find({relations:['user']});
        } catch (error) {
            return error;
        }
    }
    async findOne(id:number){
        try {
            return await this.healthrecordrepo.findOne({where:{id:id}});
        } catch (error) {
            return error;
        }
   }

   async create(createhealthrecorddto:CreateHealthRecordDTO){
        try {
            const healthrecord = await this.healthrecordrepo.create(createhealthrecorddto);
             await this.healthrecordrepo.save(healthrecord)
             return await this.findall()
        } catch (error) {
            return error;
        }
    }
    async createforuserspecific(id:number,createhealthrecorddto:CreateHealthRecordDTO){
        try {
            const healthrecord = await this.healthrecordrepo.create(createhealthrecorddto);
             await this.healthrecordrepo.save(healthrecord)
             return await this.healthrecordrepo.find({where:{userId:id}})
        } catch (error) {
            return error;
        }
    }
    async update(id:number,updatehealthrecorddto:UpdateHealthRecordDTO){
        try {
            
             await this.healthrecordrepo.update(id,updatehealthrecorddto)
             return await this.findall()
        } catch (error) {
            return error;
        }
    }
    async updateforspecificuser(id:number,userid:number,updatehealthrecorddto:UpdateHealthRecordDTO){
        try {
            
             await this.healthrecordrepo.update(id,updatehealthrecorddto)
             return await this.healthrecordrepo.find({where:{userId:userid}})
        } catch (error) {
            return error;
        }
    }
    async delete(id:number){
        try {
             await this.healthrecordrepo.delete(id)
             return await this.findall()
        } catch (error) {
            return error
        }
    }
    async deleteforspecificuser(id:number, userid:number){
        try {
            await this.healthrecordrepo.delete(id)
            return this.healthrecordrepo.find({where:{userId:userid}})
       } catch (error) {
           return error
       }
    }
}
