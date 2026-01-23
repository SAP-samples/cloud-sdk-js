import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CloudBusinessPartnerService } from './cloud-business-partner/cloud-business-partner.service';
import { OnpremiseBusinessPartnerService } from './onpremise-business-partner/onpremise-business-partner.service';
import { PrincipalBusinessPartnerService } from './principal-business-partner/principal-business-partner.service';
import { LoadtestService } from './loadtest/loadtest.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        CloudBusinessPartnerService,
        OnpremiseBusinessPartnerService,
        PrincipalBusinessPartnerService,
        LoadtestService
      ]
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
