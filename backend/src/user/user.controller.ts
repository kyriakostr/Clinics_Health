import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common/decorators';
import { CreateUserDTO, UpdateUserDTO } from './createUserdto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(private readonly userservice:UserService){}

    @Get()
    findall(){
        return this.userservice.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id:number){
        return this.userservice.findOne(id)
    }


    @Post()
    create(@Body() createuserdto:CreateUserDTO){
        return this.userservice.create(createuserdto);
    }
    @Post(':clinicid')
    createforspecificclinic(@Param('clinicid') id:number,@Body() createuserdto:CreateUserDTO){
        return this.userservice.createforspecificclinic(id,createuserdto);
    }
    @Put(':id')
    update(@Param('id') id:number,@Body() updateUserdto:UpdateUserDTO){
        return this.userservice.update(id,updateUserdto)
    }
    @Put(':id/:clinicid')
    updateforspecificclinic(@Param('id') id:number,@Param('clinicid') clinicid:number,@Body() updateUserdto:UpdateUserDTO){
        return this.userservice.updateforspecificclinic(id,clinicid,updateUserdto)
    }
    @Delete(':id')
    delete(@Param('id') id:number){
        return this.userservice.delete(id)
    }
    @Delete(':id/:clinicid')
    deleteforspecificclinic(@Param('id') id:number,@Param('clinicid') clinicid:number){
        return this.userservice.deleteforspecificclinic(id,clinicid)
    }
}
