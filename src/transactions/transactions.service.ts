import { Injectable, NotFoundException } from '@nestjs/common';
import { Transaction } from './interfaces/transactions.interfaces';
import { CreateTransactionDto } from './dto/create-transactions.dto';
import { UpdateTransactionDto } from './dto/update-transactions.dto';
import { AccountsService } from '../accounts/accounts.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly accountsService: AccountsService,
  ) {}

  private transactions: Transaction[] = [
    {
      id: 1,
      account_id: 1,
      category_id: 3,
      type: 'income',
      amount: 5000000,
      description: 'Monthly Salary',
      transaction_date: '2026-07-01',
      created_at: '2026-07-13T21:52:46.719Z',
    },
    {
      id: 2,
      account_id: 1,
      category_id: 1,
      type: 'expense',
      amount: 50000,
      description: 'Lunch',
      transaction_date: '2026-07-02',
      created_at: '2026-07-13T21:52:46.719Z',
    },
    {
      id: 3,
      account_id: 2,
      category_id: 2,
      type: 'expense',
      amount: 25000,
      description: 'Bus Ticket',
      transaction_date: '2026-07-03',
      created_at: '2026-07-13T21:52:46.719Z',
    },
  ];

  private nextId = 4;

  findAll(): Transaction[] {
    return this.transactions;
  }

  findOne(id: number): Transaction {
    const transaction = this.transactions.find((t) => t.id === id);

    if (!transaction) {
      throw new NotFoundException(
        `Transaction with ID ${id} not found`,
      );
    }

    return transaction;
  }

  private recalculateBalance(accountId: number): void {
    const transactions = this.transactions.filter(
      (transaction) => transaction.account_id === accountId,
    );

    let balance = 0;

    for (const transaction of transactions) {
      if (transaction.type === 'income') {
        balance += transaction.amount;
      } else {
        balance -= transaction.amount;
      }
    }

    this.accountsService.updateBalance(accountId, balance);
  }

  create(createTransactionDto: CreateTransactionDto): Transaction {
    const transaction: Transaction = {
      id: this.nextId++,
      ...createTransactionDto,
      created_at: new Date().toISOString(),
    };

    this.transactions.push(transaction);

    this.recalculateBalance(transaction.account_id);

    return transaction;
  }

  update(
    id: number,
    updateTransactionDto: UpdateTransactionDto,
  ): Transaction {
    const transaction = this.findOne(id);

    // Save the old account ID in case the transaction is moved
    const oldAccountId = transaction.account_id;

    Object.assign(transaction, updateTransactionDto);

    // Recalculate the old account
    this.recalculateBalance(oldAccountId);

    // If the account changed, recalculate the new one too
    if (
      updateTransactionDto.account_id &&
      updateTransactionDto.account_id !== oldAccountId
    ) {
      this.recalculateBalance(updateTransactionDto.account_id);
    }

    return transaction;
  }

  remove(id: number): Transaction {
    const index = this.transactions.findIndex((t) => t.id === id);

    if (index === -1) {
      throw new NotFoundException(
        `Transaction with ID ${id} not found`,
      );
    }

    const deleted = this.transactions[index];

    this.transactions.splice(index, 1);

    this.recalculateBalance(deleted.account_id);

    return deleted;
  }
}