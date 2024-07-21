import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clinic } from 'src/entities/clinic.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO, UpdateUserDTO } from './createUserdto';

@Injectable()
export class UserService {


    constructor(@InjectRepository(User) private readonly userRepo:Repository<User>,
    //  @InjectRepository(Clinic)
    // private readonly clinicRepo: Repository<Clinic>,
    ){}

    async findAll(){
        
        try {
            return await this.userRepo.find({
                relations:['healthrecords','clinic']
            });
        } catch (error) {
            return error
        }
    }

   async findOne(id:number){
        try {
            return await this.userRepo.findOne({where:{id:id},relations:['healthrecords']});
        } catch (error) {
            return error;
        }
   }

    async create(createUserdto:CreateUserDTO){
       try {
        // const clinic = await this.clinicRepo.findOneBy({ id: createUserdto.clinicId });
    
        // if (!clinic) {
        //   return new NotFoundException('Clinic not found');
        // }
    
        const user =this.userRepo.create(createUserdto);
    
         await this.userRepo.save(user)
         return await this.findAll()
         
       } catch (error) {
            return error.detail
       }
    }
    async createforspecificclinic(clinicid:number,createUserdto:CreateUserDTO){
        try {
         // const clinic = await this.clinicRepo.findOneBy({ id: createUserdto.clinicId });
     
         // if (!clinic) {
         //   return new NotFoundException('Clinic not found');
         // }
     
         const user =this.userRepo.create(createUserdto);
     
          await this.userRepo.save(user)
          return await this.userRepo.find({where:{clinicId:clinicid}})
          
        } catch (error) {
             return error.detail
        }
     }

    async update(id:number , updateUserdto:UpdateUserDTO){
        try {
             await this.userRepo.update(id,updateUserdto)

             return await this.findAll()
            
        } catch (error) {
            return error
        }
    }
    async updateforspecificclinic(id:number ,clinicid:number, updateUserdto:UpdateUserDTO){
        try {
             await this.userRepo.update(id,updateUserdto)

             return await this.userRepo.find({where:{clinicId:clinicid}})
            
        } catch (error) {
            return error
        }
    }
    
    async delete(id:number){
        try {
             await this.userRepo.delete(id)
             return this.findAll()
        } catch (error) {
            return error
        }
    }
    async deleteforspecificclinic(id:number, clinicid:number){
        try {
            await this.userRepo.delete(id)
            return this.userRepo.find({where:{clinicId:clinicid}})
       } catch (error) {
           return error
       }
    }
}
