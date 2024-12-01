import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>
  ){}
  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = await this.employeeRepository.save(createEmployeeDto)
    return employee;
  }

  findAll() {
    return this.employeeRepository.find({
      relations: {
        location: true,
        user: true,
      }
    });
  }

  findByLocation(id: number) {
    return this.employeeRepository.findBy({
      location: {
        locationId: id
      }
    })
  }

  findOne(id: string) {
    const employee = this.employeeRepository.findOne({
      where : {
        employeeId: id
      },
      relations: {
        location: true,
        user: true,
      }
    })
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToUpdate = await this.employeeRepository.preload({
      employeeId: id,
      ...updateEmployeeDto
    })
    this.employeeRepository.save(employeeToUpdate)
    return employeeToUpdate;
  }

  remove(id: string) {
    this.employeeRepository.delete({
      employeeId: id
    })
    return {
      message: "Employee deleted"
    }
  }
}