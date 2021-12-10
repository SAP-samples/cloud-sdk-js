"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadtestService = void 0;
const common_1 = require("@nestjs/common");
let LoadtestService = class LoadtestService {
    calculateExpensiveNumber() {
        var expensiveNumber = 0;
        for (var i = 0; i < 1000; i++) {
            for (var j = 0; j < 1000; j++) {
                expensiveNumber += i * j * Date.now();
            }
        }
        return expensiveNumber;
    }
};
LoadtestService = __decorate([
    common_1.Injectable()
], LoadtestService);
exports.LoadtestService = LoadtestService;
//# sourceMappingURL=loadtest.service.js.map