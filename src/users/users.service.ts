import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UserResponse } from './interfaces/users-response.interfaces';
import { UpdateUserDto } from './dto/update-users.dto';
import { User } from './interfaces/users.interfaces';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}


  async findAll() {
    return this.prisma.users.findMany();
  }

  async findOne(
      id: number
    ): Promise<User> {
      const user = await this.prisma.users.findUnique({
        where: {
          id,
        }
      });
  
      if (!user) {
        throw new NotFoundException(
          `User with ID ${id} not found`,
        );
      }
  
      return user;
    }

  async findByEmail(email: string) {
    return this.prisma.users.findUnique({
      where: {
        email,
      },
    });
  }

  async create(
    createUserDto: CreateUserDto,
  ): Promise<UserResponse> {

  const user = await this.prisma.users.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
        role: "user",
      },
    });

    return {
      message: "New User was successfully created",
      data: user,
    };
  }
  
  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponse> {
    await this.findOne(id);

    const user = await this.prisma.users.update({
      where: {
        id,
      },
      data: updateUserDto,
    });

    return {
      message: `User with ID ${id} was successfully updated`,
      data: user,
    };
  }

  async remove(
    id: number,
  ): Promise<UserResponse> {
    const user = await this.findOne(id);

    await this.prisma.users.delete({
      where: {
        id,
      },
    });

    return {
      message: `User with ID ${id} was successfully deleted`,
      data: user,
    };
  }
}