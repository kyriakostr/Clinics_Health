import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateHealthRecordDTO{
    
    
    @IsString()
    description:string;
    @IsString()
    date:Date;
    @IsNumber()
    userId:number;
}

export class UpdateHealthRecordDTO extends PartialType(CreateHealthRecordDTO){}