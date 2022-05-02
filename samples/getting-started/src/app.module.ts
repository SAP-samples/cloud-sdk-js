import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BusinessPartnersController } from './business-partners/business-partners.controller';
import { BusinessPartnersService } from './business-partners/business-partners.service';

@Module({
  imports: [],
  controllers: [AppController, BusinessPartnersController],
  providers: [AppService, BusinessPartnersService],
})
export class AppModule {}
