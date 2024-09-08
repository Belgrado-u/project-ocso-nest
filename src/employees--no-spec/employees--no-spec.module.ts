import { Module } from '@nestjs/common';
import { EmployeesNoSpecService } from './employees--no-spec.service';
import { EmployeesNoSpecController } from './employees--no-spec.controller';

@Module({
  controllers: [EmployeesNoSpecController],
  providers: [EmployeesNoSpecService],
})
export class EmployeesNoSpecModule {}
