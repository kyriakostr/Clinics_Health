import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ClinicController } from './clinic/clinic.controller';
import { ClinicService } from './clinic/clinic.service';
import { ClinicModule } from './clinic/clinic.module';
import { HealthRecordsModule } from './health_records/health_records.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';


@Module({
  imports: [UserModule, ClinicModule, HealthRecordsModule,TypeOrmModule.forRoot(config)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
