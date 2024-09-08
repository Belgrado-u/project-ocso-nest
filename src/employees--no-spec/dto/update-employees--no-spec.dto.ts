import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeesNoSpecDto } from './create-employees--no-spec.dto';

export class UpdateEmployeesNoSpecDto extends PartialType(CreateEmployeesNoSpecDto) {}
