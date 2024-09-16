import { Module } from '@nestjs/common';
import { EmployeesNoSpecService } from './employees--no-spec.service';
import { EmployeesNoSpecController } from './employees--no-spec.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesNoSpec } from './entities/employees--no-spec.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([EmployeesNoSpec])
  ],
  controllers: [EmployeesNoSpecController],
  providers: [EmployeesNoSpecService],
})
export class EmployeesNoSpecModule {}
