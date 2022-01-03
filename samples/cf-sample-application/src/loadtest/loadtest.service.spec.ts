import { Test, TestingModule } from '@nestjs/testing';
import { LoadtestService } from './loadtest.service';

describe('LoadtestService', () => {
  let service: LoadtestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoadtestService],
    }).compile();

    service = module.get<LoadtestService>(LoadtestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
