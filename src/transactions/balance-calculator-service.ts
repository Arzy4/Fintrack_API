import { Injectable } from "@nestjs/common";
import { Transaction } from "./interfaces/transactions.interfaces";


@Injectable()
export class BalanceCalculatorService {
    calculateBalance(transactions: Transaction[]): number {
        let balance = 0;
        
            for (const transaction of transactions) {
              const amount = Number(transaction.amount); // Convert Prisma.Decimal to number
        
              if (transaction.type === 'income') {
                balance += amount;
              } else {
                balance -= amount;
              }
            }
            
        return balance;
    }
}