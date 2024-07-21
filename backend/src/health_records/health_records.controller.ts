import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateHealthRecordDTO, UpdateHealthRecordDTO } from './createhealthrecorddto';
import { HealthRecordsService } from './health_records.service';

@Controller('health-records')
export class HealthRecordsController {
    constructor(private readonly health_record_service:HealthRecordsService){}
    @Get()
    findall(){
        return this.health_record_service.findall()

    }
    
    @Get(':id')
    findOne(@Param('id') id:number){
        return this.health_record_service.findOne(id)
    }

    @Post()
    create(@Body() createhealthrecorddto:CreateHealthRecordDTO){
        return this.health_record_service.create(createhealthrecorddto)
    }
    @Post(':userid')
    createforspecificuser(@Param('userid') id:number,@Body() createhealthrecorddto:CreateHealthRecordDTO){
        return this.health_record_service.createforuserspecific(id,createhealthrecorddto)
    }
    @Put(':id')
    update(@Param('id') id:number,@Body() updatehealthrecorddto:UpdateHealthRecordDTO){
        return this.health_record_service.update(id,updatehealthrecorddto)

    }
    @Put(':id/:userid')
    updateforspecificuser(@Param('id') id:number,@Param('userid') userid:number,@Body() updatehealthrecorddto:UpdateHealthRecordDTO){
        return this.health_record_service.updateforspecificuser(id,userid,updatehealthrecorddto)

    }
    @Delete(':id')
    delete(@Param('id') id:number){
        return this.health_record_service.delete(id)
    }
    @Delete(':id/:userid')
    deleteforspecificclinic(@Param('id') id:number,@Param('userid') userid:number){
        return this.health_record_service.deleteforspecificuser(id,userid)
    }
}
