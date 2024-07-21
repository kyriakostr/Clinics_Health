import { PartialType } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsString } from "class-validator";

export class CreateUserDTO{
  
    
    @IsString()
    name:string;

    @IsEmail()
    email:string;
    
    @IsNumber()
    clinicId:number;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO){}