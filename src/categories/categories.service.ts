import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryResponse } from './interfaces/categories-response.interfaces';
import { CreateCategoryDto } from './dto/create-categories.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateCategoryDto } from './dto/update-categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll() {
    return this.prisma.categories.findMany();
  }

  async findOne(id: number) {
    const category = await this.prisma.categories.findUnique({
      where:{
        id,
      },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  async create(
    createCategoryDto: CreateCategoryDto
  ): Promise<CategoryResponse> {
    const category = await this.prisma.categories.create({
      data: {
        name: createCategoryDto.name,
        type: createCategoryDto.type,
      }
    })

    return {
      message: 'New Category was successfully created.',
      data: category,
    };
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryResponse> {
    await this.findOne(id);

    const category = await this.prisma.categories.update({
      where: {
        id,
      },
      data: updateCategoryDto,
    });

    Object.assign(category, updateCategoryDto);

    const updatedFields = Object.keys(updateCategoryDto).join(', ');

    return {
      message: `${updatedFields} in Category with ID ${id} was successfully updated.`,
      data: category,
    };
  }

  async remove(
    id: number
  ): Promise<CategoryResponse> {
    await this.findOne(id);

    const deleted = await this.prisma.categories.delete({
      where: {
        id,
      },
    });

    return {
      message: `Category with ID ${id} was successfully deleted.`,
      data: deleted,
    };
  }
}