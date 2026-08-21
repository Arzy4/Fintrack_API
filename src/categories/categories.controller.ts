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
} from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-categories.dto';
import { UpdateCategoryDto } from './dto/update-categories.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({
    description: 'Retrieve all transaction categories.',
  })
  @ApiOkResponse({
    description: 'Categories retrieved successfully.',
  })
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @ApiOperation({
    description: 'Retrieve a transaction category by its ID.',
  })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'Category ID',
  })
  @ApiOkResponse({
    description: 'Category retrieved successfully.',
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({
    description: 'Create a new transaction category.',
  })
  @ApiCreatedResponse({
    description: 'Category created successfully.',
  })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin') 
  @ApiOperation({
    description: 'Update an existing transaction category.',
  })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'Category ID',
  })
  @ApiOkResponse({
    description: 'Category updated successfully.',
  })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiOperation({
    description: 'Delete a transaction category by ID.',
  })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'Category ID',
  })
  @ApiOkResponse({
    description: 'Category deleted successfully.',
  })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}