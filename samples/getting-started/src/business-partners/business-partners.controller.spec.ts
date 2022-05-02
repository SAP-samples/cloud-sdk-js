import { Test, TestingModule } from '@nestjs/testing';
import { BusinessPartnersController } from './business-partners.controller';

describe('BusinessPartnersController', () => {
  let controller: BusinessPartnersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessPartnersController],
    }).compile();

    controller = module.get<BusinessPartnersController>(BusinessPartnersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
