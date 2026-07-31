import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './interfaces/categories.interfaces';
import { CategoryResponse } from './interfaces/categories-response.interfaces';
import { CreateCategoryDto } from './dto/create-categories.dto';
import { UpdateCategoryDto } from './dto/update-categories.dto';

@Injectable()
export class CategoriesService {
  private categories: Category[] = [
    {
      id: 1,
      name: 'Food',
      type: 'expense',
    },
    {
      id: 2,
      name: 'Transportation',
      type: 'expense',
    },
    {
      id: 3,
      name: 'Salary',
      type: 'income',
    },
  ];

  private nextId = 4;

  findAll(): Category[] {
    return this.categories;
  }

  findOne(id: number): Category {
    const category = this.categories.find((c) => c.id === id);

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  create(createCategoryDto: CreateCategoryDto): CategoryResponse {
    const category: Category = {
      id: this.nextId++,
      ...createCategoryDto,
    };

    this.categories.push(category);

    return {
      message: 'New Category was successfully created.',
      data: category,
    };
  }

  update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): CategoryResponse {
    const category = this.findOne(id);

    Object.assign(category, updateCategoryDto);

    const updatedFields = Object.keys(updateCategoryDto).join(', ');

    return {
      message: `${updatedFields} in Category with ID ${id} was successfully updated.`,
      data: category,
    };
  }

  remove(id: number): CategoryResponse {
    const index = this.categories.findIndex((c) => c.id === id);

    if (index === -1) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    const deleted = this.categories[index];

    this.categories.splice(index, 1);

    return {
      message: `Category with ID ${id} was successfully deleted.`,
      data: deleted,
    };
  }
}