import { Controller, Get } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly TransactionsService: TransactionsService) {}

    @Get()
    findAll() {
        return this.TransactionsService.findAll();
    }
}
