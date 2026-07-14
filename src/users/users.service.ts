import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    findAll() {
        return [
            {
                id: 1,
                name: 'Robby Arzy',
                email: 'robby@example.com',
                role: 'user',
            },
            {
                id: 2,
                name: 'Amanda Wijaya',
                email: 'amanda@example.com',
                role: 'user',
            }
        ]
    }
}
