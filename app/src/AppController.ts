import { Get, Controller } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  public index() {
    return 'some';
  }
}
