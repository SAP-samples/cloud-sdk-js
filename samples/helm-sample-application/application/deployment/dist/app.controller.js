"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const onpremise_business_partner_service_1 = require("./onpremise-business-partner/onpremise-business-partner.service");
const app_service_1 = require("./app.service");
const cloud_business_partner_service_1 = require("./cloud-business-partner/cloud-business-partner.service");
const principal_business_partner_service_1 = require("./principal-business-partner/principal-business-partner.service");
const loadtest_service_1 = require("./loadtest/loadtest.service");
let AppController = class AppController {
    constructor(appService, cloudBusinessPartnerService, onpremiseBusinessPartnerService, principalBusinessPartnerService, loadtestService) {
        this.appService = appService;
        this.cloudBusinessPartnerService = cloudBusinessPartnerService;
        this.onpremiseBusinessPartnerService = onpremiseBusinessPartnerService;
        this.principalBusinessPartnerService = principalBusinessPartnerService;
        this.loadtestService = loadtestService;
    }
    getHello() {
        return this.appService.getHello();
    }
    getCloudBusinessPartner() {
        return this.cloudBusinessPartnerService.getFiveBusinessPartners();
    }
    getOnpremiseBusinessPartner() {
        return this.onpremiseBusinessPartnerService.getFiveBusinessPartners();
    }
    getPrincipalBusinessPartner(request) {
        return this.principalBusinessPartnerService.getFiveBusinessPartners(request);
    }
    calculateExpensiveNumber() {
        return this.loadtestService.calculateExpensiveNumber();
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    common_1.Get('cloud-business-partner'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getCloudBusinessPartner", null);
__decorate([
    common_1.Get('onpremise-business-partner'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getOnpremiseBusinessPartner", null);
__decorate([
    common_1.Get('principal-business-partner'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getPrincipalBusinessPartner", null);
__decorate([
    common_1.Get('loadtest'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Number)
], AppController.prototype, "calculateExpensiveNumber", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        cloud_business_partner_service_1.CloudBusinessPartnerService,
        onpremise_business_partner_service_1.OnpremiseBusinessPartnerService,
        principal_business_partner_service_1.PrincipalBusinessPartnerService,
        loadtest_service_1.LoadtestService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map