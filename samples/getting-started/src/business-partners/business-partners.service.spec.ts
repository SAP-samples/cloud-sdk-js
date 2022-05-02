import { Test, TestingModule } from '@nestjs/testing';
import { BusinessPartnersService } from './business-partners.service';

describe('BusinessPartnersService', () => {
  let service: BusinessPartnersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessPartnersService],
    }).compile();

    service = module.get<BusinessPartnersService>(BusinessPartnersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
