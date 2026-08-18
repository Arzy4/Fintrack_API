import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    example: 'BCA Savings',
    description: 'Name of the financial account',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    example: AccountType.BANK,
    enum: AccountType,
    description: 'Type of financial account',
  })
  @IsEnum(AccountType)
  type!: AccountType;

  @ApiProperty({
    example: 5000000,
    description: 'Current account balance',
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  balance!: number;
}