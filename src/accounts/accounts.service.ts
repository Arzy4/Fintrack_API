import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountResponse } from './interfaces/account-response.interfaces';

@Injectable()
export class AccountsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll(){
    return this.prisma.accounts.findMany();
  }

  async findOne(id: number){
    const account = await this.prisma.accounts.findUnique({
      where: {
        id,
      },
    });

    if (!account){
      throw new NotFoundException(
        `Account with ID ${id} not found`,
      );
    }

    return account;
  }

  async create(
    createAccountDto: CreateAccountDto,
  ): Promise<AccountResponse>{
    const account = await this.prisma.accounts.create({
      data: {
        user_id: createAccountDto.user_id,
        name: createAccountDto.name,
        type: createAccountDto.type,
        balance: createAccountDto.balance,
      },
    });


    return {
      message: "New Account was successfully created",
      data: account,
    };
  }

  async update(
    id: number,
    updateAccountDto: UpdateAccountDto,
  ): Promise<AccountResponse>{
    await this.findOne(id);

    const account = await this.prisma.accounts.update({
      where:{
        id,
      },
      data: updateAccountDto,
    });

    const updatedField = Object.keys(updateAccountDto)[0];


    return {
      message: `${updatedField} in Account with id ${id} was successfully Updated.`,
      data: account,
    };
  }

  async remove(
    id: number,
  ): Promise<AccountResponse>{
    await this.findOne(id);

    const deleted = await this.prisma.accounts.delete({
      where:{
        id,
      },
    });

    return{
      message: `Account with ID ${id} was successfully deleted.`,
      data: deleted,
    }
  }

  async updateBalance(
    accountId: number,
    newBalance: number,
  ){
    await this.findOne(accountId);

    return this.prisma.accounts.update({
      where: {
        id: accountId,
      },
      data: {
        balance: newBalance,
      }
    });
  }
}
