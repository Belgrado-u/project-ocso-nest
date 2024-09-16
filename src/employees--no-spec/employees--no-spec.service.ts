import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeesNoSpecDto } from './dto/create-employees--no-spec.dto';
import { UpdateEmployeesNoSpecDto } from './dto/update-employees--no-spec.dto';
import { v4 as uuid} from "uuid";
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeesNoSpec } from './entities/employees--no-spec.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesNoSpecService {
  constructor(
    @InjectRepository(EmployeesNoSpec)
    private employeeRepository:Repository<EmployeesNoSpec>
  ){}
  async create(createEmployeesNoSpecDto: CreateEmployeesNoSpecDto) {
    const employee=await this.employeeRepository.save(createEmployeesNoSpecDto)
    return employee;
  }

  findAll() {
    //Return all employees
    return this.employeeRepository.find();
  }

  findOne(id: string) {
    const employee=this.employeeRepository.findOneBy({
      employeeId:id
    });
    if (!employee) throw new NotFoundException();
    return employee;
  }

  async update(id: string, updateEmployeesNoSpecDto: UpdateEmployeesNoSpecDto) {
    const employeeToUpdate = await this.employeeRepository.preload({
      employeeId:id,
      ...updateEmployeesNoSpecDto
    })
    this.employeeRepository.save(employeeToUpdate)
    return employeeToUpdate;
  }

  remove(id: string) {
    this.employeeRepository.delete({
      employeeId:id
    })
    return{
      message:"Employee Deleted "
    }
  }
}
