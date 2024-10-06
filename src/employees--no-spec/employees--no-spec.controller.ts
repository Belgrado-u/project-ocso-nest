import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe,UseInterceptors,UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EmployeesNoSpecService } from './employees--no-spec.service';
import { CreateEmployeesNoSpecDto } from './dto/create-employees--no-spec.dto';
import { UpdateEmployeesNoSpecDto } from './dto/update-employees--no-spec.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/role.constants';

@Controller('employees')
export class EmployeesNoSpecController {
  constructor(private readonly employeesNoSpecService: EmployeesNoSpecService) {}

  @Auth(ROLES.MANAGER)
  @Post()
  create(@Body() createEmployeesNoSpecDto: CreateEmployeesNoSpecDto) {
    return this.employeesNoSpecService.create(createEmployeesNoSpecDto);
  }

  @Auth(ROLES.MANAGER,ROLES.EMPLOYEE)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadPhoto(@UploadedFile() file: Express.Multer.File){
    return "Ok"
  }

  @Auth(ROLES.MANAGER)
  @Get()
  findAll() {
    return this.employeesNoSpecService.findAll();
  }

  @Auth(ROLES.MANAGER)
  @Get('/:id')
  findOne(
    @Param('id', new ParseUUIDPipe({version: '4'}))
    id: string
  ) {
    return this.employeesNoSpecService.findOne(id);
  }

  @Auth(ROLES.EMPLOYEE)
  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({version: '4'})) id: string, @Body() updateEmployeesNoSpecDto: UpdateEmployeesNoSpecDto) {
    return this.employeesNoSpecService.update(id, updateEmployeesNoSpecDto);
  }

  @Auth(ROLES.MANAGER)
  @Delete(':id')
  remove(
    @Param('id', new ParseUUIDPipe({version: '4'})) 
    id: string
  ) {
    return this.employeesNoSpecService.remove(id);
  }
}
