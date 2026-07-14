import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountsService {
    findAll() {
        return [
            {
                id: 1,
                user_id: 1,
                name: 'BCA Savings',
                type: 'bank',
                balance: 5000000,
                created_at: '2026-07-13T21:52:46.719Z',
            },
            {
                id: 2,
                user_id: 1,
                name: 'GoPay',
                type: 'e-wallet',
                balance: 750000,
                created_at: '2026-07-13T21:52:46.719Z',
            },
            {
                id: 3,
                user_id: 2,
                name: 'Mandiri Savings',
                type: 'bank',
                balance: 3200000,
                created_at: '2026-07-13T21:52:46.719Z',
            },
        ]
    }
}
