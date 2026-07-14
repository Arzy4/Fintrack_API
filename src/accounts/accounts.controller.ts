import { Controller, Get } from '@nestjs/common';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
    constructor(private readonly AccountsService: AccountsService) {}

    @Get()
    findAll(){
        return this.AccountsService.findAll();
    }
}
