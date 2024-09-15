import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { EmployeesNoSpecService } from './employees--no-spec.service';
import { CreateEmployeesNoSpecDto } from './dto/create-employees--no-spec.dto';
import { UpdateEmployeesNoSpecDto } from './dto/update-employees--no-spec.dto';

@Controller('employees')
export class EmployeesNoSpecController {
  constructor(private readonly employeesNoSpecService: EmployeesNoSpecService) {}

  @Post()
  create(@Body() createEmployeesNoSpecDto: CreateEmployeesNoSpecDto) {
    return this.employeesNoSpecService.create(createEmployeesNoSpecDto);
  }

  @Get()
  findAll() {
    return this.employeesNoSpecService.findAll();
  }

  @Get('/:id')
  findOne(
    @Param('id', new ParseUUIDPipe({version: '4'}))
    id: string
  ) {
    return this.employeesNoSpecService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({version: '4'})) id: string, @Body() updateEmployeesNoSpecDto: UpdateEmployeesNoSpecDto) {
    return this.employeesNoSpecService.update(id, updateEmployeesNoSpecDto);
  }

  @Delete(':id')
  remove(
    @Param('id', new ParseUUIDPipe({version: '4'})) 
    id: string
  ) {
    return this.employeesNoSpecService.remove(id);
  }
}
