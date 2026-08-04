import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { CategoryType } from '../enums/categories-type.enum';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Food',
    description: 'Name of the transaction category',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    example: CategoryType.EXPENSE,
    enum: CategoryType,
    description: 'Type of category (income or expense)',
  })
  @IsEnum(CategoryType)
  type!: CategoryType;
}