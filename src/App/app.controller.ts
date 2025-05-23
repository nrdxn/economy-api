import { Controller, Get } from '@nestjs/common';
import { AppService } from '@/app/app.service';
import BaseController from '@/core/BaseController';

@Controller()
export class AppController extends BaseController {
    constructor(private readonly appService: AppService) {
        super();
    }

    @Get()
    get() {
        return this.sendSuccess({
            answer: 'ok',
            message: 'Успешное подключение к API'
        });
    }
}
