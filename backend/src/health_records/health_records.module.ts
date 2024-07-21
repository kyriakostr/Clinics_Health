import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthRecord } from 'src/entities/healthrecord.entity';
import { HealthRecordsController } from './health_records.controller';
import { HealthRecordsService } from './health_records.service';

@Module({
  imports:[TypeOrmModule.forFeature([HealthRecord])],
  controllers: [HealthRecordsController],
  providers: [HealthRecordsService]
})
export class HealthRecordsModule {}
