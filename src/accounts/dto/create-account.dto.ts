import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { AccountType } from '../enums/account-type.enum';

export class CreateAccountDto {
  @IsInt()
  @IsPositive()
  user_id!: number;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEnum(AccountType)
  type!: AccountType;

  @IsNumber()
  @Min(0)
  balance!: number;
}