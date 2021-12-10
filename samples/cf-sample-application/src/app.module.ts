import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OnpremiseBusinessPartnerService } from './onpremise-business-partner/onpremise-business-partner.service';
import { CloudBusinessPartnerService } from './cloud-business-partner/cloud-business-partner.service';
import { PrincipalBusinessPartnerService } from './principal-business-partner/principal-business-partner.service';
import { LoadtestService } from './loadtest/loadtest.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    OnpremiseBusinessPartnerService,
    CloudBusinessPartnerService,
    PrincipalBusinessPartnerService,
    LoadtestService,
  ],
})
export class AppModule {}
