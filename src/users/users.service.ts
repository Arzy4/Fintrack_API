import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UserResponse } from './interfaces/users-response.interfaces';
import { UpdateUserDto } from './dto/update-users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}


  async findAll() {
    return this.prisma.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        created_at: true,
      }
    });
  }

  async findOne(id: number, userId: number, role: string) {
    if (role === 'admin') {
      return this.prisma.users.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          created_at: true,
        },
      });
    }

    if (id !== userId) {
      throw new ForbiddenException(
        'You can only access your own user information',
      );
    }

    return this.prisma.users.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        created_at: true,
      }
    });
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

  const hashedPassword = await bcrypt.hash(
    createUserDto.password,
    10,
  );

  const user = await this.prisma.users.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword,
        role: "user",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        created_at: true,
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
    userId: number,
    role: string,
  ): Promise<UserResponse> {

    if (role !== 'admin' && id !== userId) {
      throw new ForbiddenException(
        'You can only update your own information',
      );
    }

    await this.findOne(id, userId, role);

    const data = { ...updateUserDto };

    if (updateUserDto.password) {
      data.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const user = await this.prisma.users.update({
      where: {
        id,
      },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        created_at: true,
      },
    });

    return {
      message: `User with ID ${id} was successfully updated`,
      data: user,
    };
  }

  async remove(
    id: number,
    userId: number,
    role: string,
  ): Promise<UserResponse> {

    if (role !== 'admin' && id !== userId) {
      throw new ForbiddenException(
        'You can only delete your own account',
      );
    }

    const user = await this.findOne(id, userId, role);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

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