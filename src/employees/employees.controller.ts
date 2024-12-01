import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { EmployeesService } from "./employees.service";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { Auth } from "src/auth/decorators/auth.decorator";
import { ROLES } from "src/auth/constants/role.constants";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Employee } from "./entities/employee.entity";
import { ApiAuth } from "src/auth/decorators/api.decorator";
import { AwsService } from "src/aws/aws.service";

@ApiAuth()
@ApiTags("Employees")
@Controller("employees")
@Auth(ROLES.MANAGER, ROLES.ADMIN)
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly awsService: AwsService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor("employeePhoto"))
  @ApiResponse({
    status: 201,
    example: {
      employeeId: "UUID",
      employeeName: "Karlo",
      employeeEmail: "karlo@gmail.com",
      employeeLastName: "Paz",
      employeePhoneNumber: "442138841",
    } as Employee,
  })
  async create(
    @Body() createEmployeeDto: CreateEmployeeDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      return this.employeesService.create(createEmployeeDto);
    }
    const fileUrl = await this.awsService.uploadFile(file);
    createEmployeeDto.employeePhoto = fileUrl;
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.employeesService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Delete(":id")
  @Auth(ROLES.ADMIN)
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.employeesService.remove(id);
  }
}