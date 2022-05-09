import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BusinessPartnerController } from "./business-partner.controller";
import { BusinessPartnerService } from "./business-partner.service";

@Module({
  imports: [],
  controllers: [AppController, BusinessPartnerController],
  providers: [AppService, BusinessPartnerService],
})
export class AppModule {}
