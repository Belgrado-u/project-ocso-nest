import { Injectable } from '@nestjs/common';
import { CreateEmployeesNoSpecDto } from './dto/create-employees--no-spec.dto';
import { UpdateEmployeesNoSpecDto } from './dto/update-employees--no-spec.dto';

@Injectable()
export class EmployeesNoSpecService {
  private employees: CreateEmployeesNoSpecDto[]=[
  {
    id:1,
    name: "Alberto",
    latName:"Costas",
    phoneNUmber:"5342526271"
  },
  {
    id:2,
    name: "Jose",
    latName:"Perez",
    phoneNUmber:"5342526445"
  }]
  create(createEmployeesNoSpecDto: CreateEmployeesNoSpecDto) {
    createEmployeesNoSpecDto.id=this.employees.length+1
    this.employees.push(createEmployeesNoSpecDto);
    return createEmployeesNoSpecDto
  }

  findAll() {
    //Return all employees
    return this.employees;
  }

  findOne(id: number) {
    const employee=this.employees.filter((employee)=>employee.id==id)[0];
    return employee;
  }

  update(id: number, updateEmployeesNoSpecDto: UpdateEmployeesNoSpecDto) {
    let employeeToUpdate = this.findOne(id);
     employeeToUpdate = {
      ...employeeToUpdate,
      ...UpdateEmployeesNoSpecDto,

     }
     this.employees=this.employees.map((employee)=>{
      if(employee.id==id){
        employee=employeeToUpdate
      }
      return employee
     })
     return employeeToUpdate;
  }

  remove(id: number) {
    this.employees= this.employees.filter((employee)=>employee.id!=id);
    return this.employees;
  }
}
