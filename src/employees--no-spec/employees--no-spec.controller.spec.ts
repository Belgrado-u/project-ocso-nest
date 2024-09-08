import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesNoSpecController } from './employees--no-spec.controller';
import { EmployeesNoSpecService } from './employees--no-spec.service';

describe('EmployeesNoSpecController', () => {
  let controller: EmployeesNoSpecController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesNoSpecController],
      providers: [EmployeesNoSpecService],
    }).compile();

    controller = module.get<EmployeesNoSpecController>(EmployeesNoSpecController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
