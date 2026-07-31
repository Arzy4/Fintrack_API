import { Injectable, NotFoundException } from '@nestjs/common';
import { Account } from './interfaces/account.interfaces';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
  private accounts: Account[] = [
    {
      id: 1,
      user_id: 1,
      name: 'BCA Savings',
      type: 'bank',
      balance: 5000000,
      created_at: '2026-07-13T21:52:46.719Z',
    },
    {
      id: 2,
      user_id: 1,
      name: 'GoPay',
      type: 'e-wallet',
      balance: 750000,
      created_at: '2026-07-13T21:52:46.719Z',
    },
    {
      id: 3,
      user_id: 2,
      name: 'Mandiri Savings',
      type: 'bank',
      balance: 3200000,
      created_at: '2026-07-13T21:52:46.719Z',
    },
  ];

  private nextId = 4;

  findAll(): Account[] {
    return this.accounts;
  }

  findOne(id: number): Account {
    const account = this.accounts.find((a) => a.id === id);

    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }

    return account;
  }

  create(createAccountDto: CreateAccountDto): Account {
    const account: Account = {
      id: this.nextId++,
      ...createAccountDto,
      created_at: new Date().toISOString(),
    };

    this.accounts.push(account);

    return account;
  }

  update(id: number, updateAccountDto: UpdateAccountDto): Account {
    const account = this.findOne(id);

    Object.assign(account, updateAccountDto);

    return account;
  }

  remove(id: number): Account {
    const index = this.accounts.findIndex((a) => a.id === id);

    if (index === -1) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }

    const deleted = this.accounts[index];

    this.accounts.splice(index, 1);

    return deleted;
  }

  updateBalance(accountId: number, newBalance: number): Account {
    const account = this.findOne(accountId);

    account.balance = newBalance;

    return account;
  }
}
