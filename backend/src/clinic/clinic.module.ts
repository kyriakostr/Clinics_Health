import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clinic } from 'src/entities/clinic.entity';
import { ClinicController } from './clinic.controller';
import { ClinicService } from './clinic.service';

@Module({
    imports:[TypeOrmModule.forFeature([Clinic])],
    controllers: [ClinicController],
    providers: [ClinicService]
})
export class ClinicModule {}
