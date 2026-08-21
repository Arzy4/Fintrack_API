import { ForbiddenException, Injectable } from '@nestjs/common';
import { Transaction } from './interfaces/transactions.interfaces';
import { CreateTransactionDto } from './dto/create-transactions.dto';
import { UpdateTransactionDto } from './dto/update-transactions.dto';
import { TransactionResponse } from './interfaces/transactions-response.interfaces';
import { PrismaService } from '../prisma/prisma.service';
import { AccountsService } from '../accounts/accounts.service';
import { BalanceCalculatorService } from './balance-calculator-service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly accountsService: AccountsService,
    private readonly balanceCalculatorService: BalanceCalculatorService,
  ) {}

  async findAll(
    userId: number
  ) {
    return this.prisma.transactions.findMany({
      where: {
        accounts:{
          user_id: userId,
        }
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
  }

  async findOne(
    id: number,
    userId: number,
  ): Promise<Transaction> {
    const transaction = await this.prisma.transactions.findFirst({
      where: {
        id,
        accounts: {
          user_id: userId,
        }
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
      throw new ForbiddenException(
        `You can only access your own transaction information`,
      );
    }

    return transaction;
  }

  private async recalculateBalance(
    accountId: number,
    userId: number,
  ): Promise<void> {
    const transactions = await this.prisma.transactions.findMany({
      where: {
        account_id: accountId,
        accounts: {
          user_id: userId,
        }
      }
    });

    const balance = this.balanceCalculatorService.calculateBalance(transactions);

    await this.accountsService.updateBalance(accountId, balance, userId);
  }

  async create(
    createTransactionDto: CreateTransactionDto,
    userId: number,
  ): Promise<TransactionResponse> {
    await this.accountsService.findOne(
      createTransactionDto.account_id,
      userId,
    );

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

    await this.recalculateBalance(transaction.account_id, userId);

    return {
      message: `New Transaction was successfully created`,
      data: transaction,
    };
  }

  async update(
    id: number,
    userId: number,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<TransactionResponse> {
    const transaction = await this.findOne(id, userId);

    // Save the old account ID in case the transaction is moved
    const oldAccountId = transaction.account_id;

    // Verify new account belongs to authenticated user
    if (
      updateTransactionDto.account_id &&
      updateTransactionDto.account_id !== oldAccountId
    ) {
      await this.accountsService.findOne(
        updateTransactionDto.account_id,
        userId,
      );
    }

    const updatedTransaction = await this.prisma.transactions.update({
      where:{
        id,
      },
      data: updateTransactionDto,
    });

    // Recalculate the old account
    await this.recalculateBalance(oldAccountId, userId);

    // If the account changed, recalculate the new one too
    if (
      updateTransactionDto.account_id &&
      updateTransactionDto.account_id !== oldAccountId
    ) {
      await this.recalculateBalance(updateTransactionDto.account_id, userId);
    }

    const updatedFields = Object.keys(updateTransactionDto).join(', ');

    return {
      message: `${updatedFields} in Transaction with ID ${id} was successfully updated`,
      data: updatedTransaction,
    };
  }

  async remove(
    id: number,
    userId: number,
  ): Promise<TransactionResponse> {
    const transaction = await this.findOne(id, userId);

    const deleted = await this.prisma.transactions.delete({
      where:{
        id,
      },
    });;

    await this.recalculateBalance(transaction.account_id, userId);

    return {
      message: `Transaction with ID ${id} was successfully deleted`,
      data: deleted,
    };
  }
}