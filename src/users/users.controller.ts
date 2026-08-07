import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import {
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiParam,
} from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    description: 'Retrieve a list of all registered users.',
  })
  @ApiOkResponse({
    description: 'Users retrieved successfully.',
  })  
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({
    description: 'Retrieve a specific user by ID.',
  })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'User ID',
  })
  @ApiOkResponse({
    description: 'User retrieved successfully.',
  })
  @Get(`:id`)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({
    description: 'Create a new user account.',
  })
  @ApiCreatedResponse({
    description: 'User created successfully.',
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({
    description: 'Update an existing user by ID.',
  })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'User ID',
  })
  @ApiOkResponse({
    description: 'User updated successfully.',
  })
  @Patch(`:id`)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({
    description: 'Delete a user by ID.',
  })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'User ID',
  })
  @ApiOkResponse({
    description: 'User deleted successfully.',
  })
  @Delete(`:id`)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}