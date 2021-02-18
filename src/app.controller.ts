import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as bcrypt from 'bcrypt';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    bcrypt.hash('MyPassword123', 10).then(function(hash) {
      console.log(hash);
    });
  }
}
