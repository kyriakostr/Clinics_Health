import { PartialType } from "@nestjs/swagger";
import { IsEmail, IsString,IsNumberString} from "class-validator";

export class CreateClinicDTO{

    

    @IsString()
    name:string;

    @IsString()
    adress:string;

    @IsNumberString()
    phone:string;
    
    @IsEmail()
    email:string;

}

export class UpdateClinicDTO extends PartialType(CreateClinicDTO){}