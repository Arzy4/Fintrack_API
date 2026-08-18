import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';

import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Retrieve a list of all financial accounts.',
  })
  @ApiOkResponse({
    description: 'Accounts retrieved successfully.',
  })
  @Get()
  findAll(@Request() req) {
    return this.accountsService.findAll(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
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
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Request() req, 
  ){
    return this.accountsService.findOne(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Create a financial account for a user.',
  })
  @ApiCreatedResponse({
    description: 'Account created successfully.',
  })
  @Post()
  create(
    @Body() createAccountDto: CreateAccountDto,
    @Request() req,
  ) {
    return this.accountsService.create(createAccountDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
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
    @Request() req,
  ) {
    return this.accountsService.update(id, updateAccountDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
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
  remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.accountsService.remove(id, req.user.id);
  }
}