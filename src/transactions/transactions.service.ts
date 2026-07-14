import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionsService {
    findAll() {
    return [
      {
        id: 1,
        account_id: 1,
        category_id: 1,
        type: 'income',
        amount: 7000000,
        description: 'January salary',
        transaction_date: '2026-01-25',
        created_at: '2026-07-13T21:52:46.719Z',
      },
      {
        id: 2,
        account_id: 1,
        category_id: 4,
        type: 'expense',
        amount: 125000,
        description: 'Weekly groceries',
        transaction_date: '2026-01-27',
        created_at: '2026-07-13T21:52:46.719Z',
      },
      {
        id: 3,
        account_id: 2,
        category_id: 5,
        type: 'expense',
        amount: 22000,
        description: 'Online motorcycle ride',
        transaction_date: '2026-02-08',
        created_at: '2026-07-13T21:52:46.719Z',
      },
    ];
  }
}
