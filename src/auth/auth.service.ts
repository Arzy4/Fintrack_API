import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async register(registerDto: RegisterDto) {
        const existingUser = await this.usersService.findByEmail(
        registerDto.email,
        );

        if (existingUser) {
        throw new ConflictException('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(
        registerDto.password,
        10,
        );

        return this.usersService.create({
        ...registerDto,
        password: hashedPassword,
        });
    }

    async login(loginDto: LoginDto) {
        const user = await this.usersService.findByEmail(
            loginDto.email
        );

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(
            loginDto.password, 
            user.password
        );

        if (!isMatch) {
            throw new UnauthorizedException('Invalid password');
        }

        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };

        const token = this.jwtService.sign(payload);

        return { token };
    }
}
