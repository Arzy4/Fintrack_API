import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    description: 'Verify that the FinTrack API is running.',
  })
  @ApiOkResponse({
    description: 'API is running successfully.',
  })
  @Get('health')
  health() {
    return {
      status: 'ok',
      message: 'FinTrack API is running'
    };
  }
}
