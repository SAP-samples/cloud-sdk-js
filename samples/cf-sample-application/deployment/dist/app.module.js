"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const onpremise_business_partner_service_1 = require("./onpremise-business-partner/onpremise-business-partner.service");
const cloud_business_partner_service_1 = require("./cloud-business-partner/cloud-business-partner.service");
const principal_business_partner_service_1 = require("./principal-business-partner/principal-business-partner.service");
const loadtest_service_1 = require("./loadtest/loadtest.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            onpremise_business_partner_service_1.OnpremiseBusinessPartnerService,
            cloud_business_partner_service_1.CloudBusinessPartnerService,
            principal_business_partner_service_1.PrincipalBusinessPartnerService,
            loadtest_service_1.LoadtestService,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map