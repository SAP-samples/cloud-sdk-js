import { Injectable } from '@nestjs/common';

@Injectable()
export class LoadtestService {
  calculateExpensiveNumber(): number {
    let expensiveNumber = 0;
    for (let i = 0; i < 1000; i++) {
      for (let j = 0; j < 1000; j++) {
        expensiveNumber += i * j * Date.now();
      }
    }
    return expensiveNumber;
  }
}
