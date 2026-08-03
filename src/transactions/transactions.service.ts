import { Injectable, NotFoundException } from '@nestjs/common';
import { Transaction } from './interfaces/transactions.interfaces';
import { CreateTransactionDto } from './dto/create-transactions.dto';
import { UpdateTransactionDto } from './dto/update-transactions.dto';
import { TransactionResponse } from './interfaces/transactions-response.interfaces';
import { PrismaService } from '../prisma/prisma.service';
import { AccountsService } from '../accounts/accounts.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly accountsService: AccountsService,
  ) {}

  async findAll() {
    return this.prisma.transactions.findMany({
      include: {
        accounts: {
          select: {
            name: true,
            type: true,
            balance: true,
          }
        },
        categories: {
          select: {
            name: true,
            type: true,
          }
        }
      }
    });
  }

  async findOne(
    id: number
  ): Promise<Transaction> {
    const transaction = await this.prisma.transactions.findUnique({
      where: {
        id,
      },
      include: {
        accounts: {
          select: {
            name: true,
            type: true,
            balance: true,
          }
        },
        categories: {
          select: {
            name: true,
            type: true,
          }
        }
      }
    });

    if (!transaction) {
      throw new NotFoundException(
        `Transaction with ID ${id} not found`,
      );
    }

    return transaction;
  }

  private async recalculateBalance(
    accountId: number
  ): Promise<void> {
    const transactions = await this.prisma.transactions.findMany({
      where: {
        account_id: accountId,
      }
    });

    let balance = 0;

    for (const transaction of transactions) {
      const amount = Number(transaction.amount); // Convert Prisma.Decimal to number

      if (transaction.type === 'income') {
        balance += amount;
      } else {
        balance -= amount;
      }
    }

    this.accountsService.updateBalance(accountId, balance);
  }

  async create(
    createTransactionDto: CreateTransactionDto
  ): Promise<TransactionResponse> {
    const transaction = await this.prisma.transactions.create({
      data: {
        account_id: createTransactionDto.account_id,
        category_id: createTransactionDto.category_id,
        type: createTransactionDto.type,
        amount: createTransactionDto.amount,
        description: createTransactionDto.description,
        transaction_date: new Date(createTransactionDto.transaction_date),
      }
    })

    await this.recalculateBalance(transaction.account_id);

    return {
      message: `New Transaction was successfully created`,
      data: transaction,
    };
  }

  async update(
    id: number,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<TransactionResponse> {
    const transaction = await this.findOne(id);

    // Save the old account ID in case the transaction is moved
    const oldAccountId = transaction.account_id;

    const updatedTransaction = await this.prisma.transactions.update({
      where:{
        id,
      },
      data: updateTransactionDto,
    });

    // Recalculate the old account
    await this.recalculateBalance(oldAccountId);

    // If the account changed, recalculate the new one too
    if (
      updateTransactionDto.account_id &&
      updateTransactionDto.account_id !== oldAccountId
    ) {
      this.recalculateBalance(updateTransactionDto.account_id);
    }

    const updatedFields = Object.keys(updateTransactionDto).join(', ');

    return {
      message: `${updatedFields} in Transaction with ID ${id} was successfully updated`,
      data: updatedTransaction,
    };
  }

  async remove(
    id: number
  ): Promise<TransactionResponse> {
    const transaction = await this.findOne(id);

    const deleted = await this.prisma.transactions.delete({
      where:{
        id,
      },
    });;

    await this.recalculateBalance(transaction.account_id);

    return {
      message: `Transaction with ID ${id} was successfully deleted`,
      data: deleted,
    };
  }
}