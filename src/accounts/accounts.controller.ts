import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @ApiOperation({
    description: 'Retrieve a list of all financial accounts.',
  })
  @ApiOkResponse({
    description: 'Accounts retrieved successfully.',
  })
  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  @ApiOperation({
    description: 'Retrieve a financial account by its ID.',
  })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'Account ID',
  })
  @ApiOkResponse({
    description: 'Account retrieved successfully.',
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.accountsService.findOne(id);
  }

  @ApiOperation({
    description: 'Create a financial account for a user.',
  })
  @ApiCreatedResponse({
    description: 'Account created successfully.',
  })
  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @ApiOperation({
    description: 'Update an existing financial account.',
  })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'Account ID',
  })
  @ApiOkResponse({
    description: 'Account updated successfully.',
  })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    return this.accountsService.update(id, updateAccountDto);
  }

  @ApiOperation({
    description: 'Delete a financial account by ID.',
  })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'Account ID',
  })
  @ApiOkResponse({
    description: 'Account deleted successfully.',
  })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.accountsService.remove(id);
  }
}