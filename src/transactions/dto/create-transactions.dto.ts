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
  @IsInt()
  @IsPositive()
  account_id!: number;

  @IsInt()
  @IsPositive()
  category_id!: number;

  @IsEnum(TransactionType)
  type!: TransactionType;

  @IsPositive()
  amount!: number;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsDateString()
  transaction_date!: string;
}