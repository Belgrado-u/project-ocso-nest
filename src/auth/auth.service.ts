import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { LoginUserDto } from "./dto/login-user.dto"; 
import { UpdateUserDto } from "./dto/update-user.dto";
import { Employee } from "src/employees/entities/employee.entity";
import { Manager } from "src/managers/entities/manager.entity";
import { ROLES } from "./constants/role.constants";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
    @InjectRepository(Manager) private managerRepository: Repository<Manager>,
    private jwtService: JwtService,
  ) {}

  async registerEmployee(id: string, createUserDto: CreateUserDto) {
    const roles = createUserDto.userRoles;
    if (roles.includes(ROLES.ADMIN) || roles.includes(ROLES.MANAGER)) {
      throw new BadRequestException("Un empleado no puede tener roles de Admin o Manager");
    }
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 10);
    const user = await this.userRepository.save(createUserDto);
    const employee = await this.employeeRepository.preload({
      employeeId: id,
    });
    employee.user = user;
    return this.employeeRepository.save(employee);
  }

  async registerManager(id: string, createUserDto: CreateUserDto) {
    const roles = createUserDto.userRoles;
    if (roles.includes(ROLES.ADMIN) || roles.includes(ROLES.EMPLOYEE)) {
      throw new BadRequestException("Un manager no puede tener roles de Admin o Employee");
    }
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 10);
    const user = await this.userRepository.save(createUserDto);
    const manager = await this.managerRepository.preload({
      managerId: id,
    });
    manager.user = user;
    return this.managerRepository.save(manager);
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        userEmail: loginUserDto.userEmail,
      },
    });
    
    if (!user) {
      throw new UnauthorizedException("Credenciales incorrectas");
    }

    const isPasswordValid = await bcrypt.compare(
      loginUserDto.userPassword,
      user.userPassword,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException("Credenciales incorrectas");
    }

    const payload = {
      userEmail: user.userEmail,
      userRoles: user.userRoles,
      sub: user.userId
    };

    return this.jwtService.sign(payload);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.userPassword) {
      updateUserDto.userPassword = bcrypt.hashSync(updateUserDto.userPassword, 10);
    }
    
    const newUserData = await this.userRepository.preload({
      userId: id,
      ...updateUserDto
    });

    if (!newUserData) {
      throw new BadRequestException("Usuario no encontrado");
    }

    return this.userRepository.save(newUserData);
  }
}