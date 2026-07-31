import { Injectable, NotFoundException, Patch } from '@nestjs/common';
import { Account } from './interfaces/account.interfaces';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountResponse } from './interfaces/account-response.interfaces';

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

  create(createAccountDto: CreateAccountDto): AccountResponse {
    const account: Account = {
      id: this.nextId++,
      ...createAccountDto,
      created_at: new Date().toISOString(),
    };

    this.accounts.push(account);

    return {
      message: `New Account was successfully created`,
      data: account,
    };
  }

  update(id: number, updateAccountDto: UpdateAccountDto): AccountResponse {
    const account = this.findOne(id);

    Object.assign(account, updateAccountDto);

    const updatedField = Object.keys(updateAccountDto)[0];

    return {
      message: `${updatedField} in Account with id ${id} was successfully Updated.`,
      data: account,
    };
  }

  remove(id: number): AccountResponse {
    const index = this.accounts.findIndex((a) => a.id === id);

    if (index === -1) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }

    const deleted = this.accounts[index];

    this.accounts.splice(index, 1);

    return {
      message: `Account with ID ${id} was successfully deleted.`,
      data: deleted,
    };
  }

  updateBalance(accountId: number, newBalance: number): Account {
    const account = this.findOne(accountId);

    account.balance = newBalance;

    return account;
  }
}
