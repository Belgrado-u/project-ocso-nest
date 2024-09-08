import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesNoSpecModule } from './employees--no-spec/employees--no-spec.module';

@Module({
  imports: [EmployeesNoSpecModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
