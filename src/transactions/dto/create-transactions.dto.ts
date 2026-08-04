import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator';
import { TransactionType } from '../enums/transactions-type.enum';

export class CreateTransactionDto {
  @ApiProperty({
    example: 1,
    description: 'ID of the account where the transaction is recorded',
  })
  @IsInt()
  @IsPositive()
  account_id!: number;

  @ApiProperty({
    example: 2,
    description: 'ID of the category assigned to this transaction',
  })
  @IsInt()
  @IsPositive()
  category_id!: number;

  @ApiProperty({
    example: TransactionType.EXPENSE,
    enum: TransactionType,
    description: 'Type of transaction (income or expense)',
  })
  @IsEnum(TransactionType)
  type!: TransactionType;

  @ApiProperty({
    example: 50000,
    description: 'Transaction amount',
    minimum: 1,
  })
  @IsPositive()
  amount!: number;

  @ApiProperty({
    example: 'Lunch at a restaurant',
    description: 'Short description of the transaction',
  })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({
    example: '2026-08-04',
    description: 'Transaction date in YYYY-MM-DD format',
    format: 'date',
  })
  @IsDateString()
  transaction_date!: string;
}