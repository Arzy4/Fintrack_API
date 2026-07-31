import { Injectable } from '@nestjs/common';
import { User } from './interfaces/users.interfaces';
import { CreateUserDto } from './dto/create-users.dto';
import { UserResponse } from './interfaces/users-response.interfaces';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      created_at: '2026-07-13T21:52:46.719Z',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'password456',
      created_at: '2026-07-13T21:52:46.719Z',
    },
  ];

  private nextId = 3;

  findAll(): User[] {
    return this.users;
  }

  create(createUserDto: CreateUserDto): UserResponse {
    const user: User = {
      id: this.nextId++,
      ...createUserDto,
      created_at: new Date().toISOString(),
    };

    this.users.push(user);

    return {
      message: `New User was successfully created`,
      data: user,
    };
  }
}