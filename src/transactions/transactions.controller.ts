import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';

import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transactions.dto';
import { UpdateTransactionDto } from './dto/update-transactions.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Retrieve a list of all transactions, including their related account and category information.',
  })
  @ApiOkResponse({
    description: 'Transactions retrieved successfully.',
  })
  @Get()
  findAll(
    @Request() req,
  ) {
    return this.transactionsService.findAll(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Retrieve a transaction by its ID, including the related account and category information.',
  })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'Transaction ID',
  })
  @ApiOkResponse({
    description: 'Transaction retrieved successfully.',
  })
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number, 
    @Request() req
  ) {
    return this.transactionsService.findOne(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Create a new financial transaction.',
  })
  @ApiCreatedResponse({
    description: 'Transaction created successfully.',
  })
  @Post()
  create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Request() req,
  ) {
    return this.transactionsService.create(createTransactionDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Update an existing financial transaction.',
  })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'Transaction ID',
  })
  @ApiOkResponse({
    description: 'Transaction updated successfully.',
  })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTransactionDto: UpdateTransactionDto,
    @Request() req,
  ) {
    return this.transactionsService.update(
      id,
      req.user.id,
      updateTransactionDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Delete a financial transaction by its ID.',
  })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'Transaction ID',
  })
  @ApiOkResponse({
    description: 'Transaction deleted successfully.',
  })
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ) {
    return this.transactionsService.remove(id, req.user.id);
  }
}