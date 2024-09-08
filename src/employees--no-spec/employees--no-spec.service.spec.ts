import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesNoSpecService } from './employees--no-spec.service';

describe('EmployeesNoSpecService', () => {
  let service: EmployeesNoSpecService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeesNoSpecService],
    }).compile();

    service = module.get<EmployeesNoSpecService>(EmployeesNoSpecService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
