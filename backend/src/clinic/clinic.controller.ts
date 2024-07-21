import { Body, Controller, Get, Post,Delete, Put, Param } from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { CreateClinicDTO, UpdateClinicDTO } from './createClinicDto';

@Controller('clinics')
export class ClinicController {

    constructor(private readonly clinicservice:ClinicService){}
    @Get()
    findall(){
        return this.clinicservice.findall()

    }
    
    @Get(':clinicid')
    findOne(@Param('clinicid') id:number){
        return this.clinicservice.findOne(id)
    }
    

    @Post()
    create(@Body() createcinicdto:CreateClinicDTO){
        return this.clinicservice.create(createcinicdto)
    }
    
    @Put(':id')
    update(@Param('id') id:number,@Body() updateClinicdto:UpdateClinicDTO){
        return this.clinicservice.update(id,updateClinicdto)
    }
    @Delete(':id')
    delete(@Param('id') id:number){
        return this.clinicservice.delete(id);
    }
}
