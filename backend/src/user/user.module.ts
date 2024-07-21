import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clinic } from 'src/entities/clinic.entity';
import { User } from 'src/entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
