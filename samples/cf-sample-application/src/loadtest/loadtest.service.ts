import { Injectable } from '@nestjs/common';

@Injectable()
export class LoadtestService {
    calculateExpensiveNumber(): number {
        var expensiveNumber = 0;
        for(var i = 0; i<1000; i++){
            for(var j = 0; j<1000; j++){
                expensiveNumber += i*j*Date.now()
            }
        }
        return expensiveNumber;
    }
}
