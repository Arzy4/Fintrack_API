import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './interfaces/categories.interfaces';
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

  create(createCategoryDto: CreateCategoryDto): Category {
    const category: Category = {
      id: this.nextId++,
      ...createCategoryDto,
    };

    this.categories.push(category);

    return category;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto): Category {
    const category = this.findOne(id);

    Object.assign(category, updateCategoryDto);

    return category;
  }

  remove(id: number): Category {
    const index = this.categories.findIndex((c) => c.id === id);

    if (index === -1) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    const deleted = this.categories[index];

    this.categories.splice(index, 1);

    return deleted;
  }
}