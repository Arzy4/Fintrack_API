import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesService {
    findAll(){
        return [
            {
                id: 1,
                name: 'Salary',
                type: 'income',
            },
            {
                id: 2,
                name: 'Freelance',
                type: 'income',
            },
            {
                id: 3,
                name: 'Bonus',
                type: 'income',
            },
            {
                id: 4,
                name: 'Food',
                type: 'expense',
            },
            {
                id: 5,
                name: 'Transportation',
                type: 'expense',
            },
            {
                id: 6,
                name: 'Entertainment',
                type: 'expense',
            },
        ];
    }
}
