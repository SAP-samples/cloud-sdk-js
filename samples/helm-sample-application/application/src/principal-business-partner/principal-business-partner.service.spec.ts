import { Test, TestingModule } from '@nestjs/testing';
import { PrincipalBusinessPartnerService } from './principal-business-partner.service';

describe('PrincipalBusinessPartnerService', () => {
  let service: PrincipalBusinessPartnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrincipalBusinessPartnerService],
    }).compile();

    service = module.get<PrincipalBusinessPartnerService>(PrincipalBusinessPartnerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
