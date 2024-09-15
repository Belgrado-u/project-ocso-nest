import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeesNoSpecDto } from './dto/create-employees--no-spec.dto';
import { UpdateEmployeesNoSpecDto } from './dto/update-employees--no-spec.dto';
import { v4 as uuid} from "uuid";

@Injectable()
export class EmployeesNoSpecService {
  private employees: CreateEmployeesNoSpecDto[]=[
  {
    id:uuid(),
    name: "Alberto",
    latName:"Costas",
    phoneNUmber:"5342526271"
  },
  {
    id:uuid(),
    name: "Jose",
    latName:"Perez",
    phoneNUmber:"5342526445"
  }]
  create(createEmployeesNoSpecDto: CreateEmployeesNoSpecDto) {
    createEmployeesNoSpecDto.id=uuid();
    this.employees.push(createEmployeesNoSpecDto);
    return createEmployeesNoSpecDto
  }

  findAll() {
    //Return all employees
    return this.employees;
  }

  findOne(id: string) {
    const employee=this.employees.filter((employee)=>employee.id==id)[0];
    if (!employee) throw new NotFoundException();
    return employee;
  }

  update(id: string, updateEmployeesNoSpecDto: UpdateEmployeesNoSpecDto) {
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

  remove(id: string) {
    this.findOne(id)
    this.employees= this.employees.filter((employee)=>employee.id!=id);
    return this.employees;
  }
}
