import { Test, TestingModule } from '@nestjs/testing';
import { OnpremiseBusinessPartnerService } from './onpremise-business-partner.service';

describe('OnpremiseBusinessPartnerService', () => {
  let service: OnpremiseBusinessPartnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OnpremiseBusinessPartnerService],
    }).compile();

    service = module.get<OnpremiseBusinessPartnerService>(
      OnpremiseBusinessPartnerService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
