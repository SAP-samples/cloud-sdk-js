import { Test, TestingModule } from '@nestjs/testing';
import { CloudBusinessPartnerService } from './cloud-business-partner.service';

describe('CloudBusinessPartnerService', () => {
  let service: CloudBusinessPartnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CloudBusinessPartnerService],
    }).compile();

    service = module.get<CloudBusinessPartnerService>(
      CloudBusinessPartnerService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
