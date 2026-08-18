import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { AccountsModule } from '../accounts/accounts.module';
import { BalanceCalculatorService } from './balance-calculator-service';

@Module({
  imports: [AccountsModule],
  controllers: [TransactionsController],
  providers: [TransactionsService, BalanceCalculatorService]
})
export class TransactionsModule {}
