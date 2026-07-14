import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly CategoriesService: CategoriesService) {}

    @Get()
    findAll(){
        return this.CategoriesService.findAll();
    }
}
