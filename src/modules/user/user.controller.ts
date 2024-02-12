import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users') //префикс
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all') // GET /users/all
  getUsers() {
    return this.userService.getUsers();
  }
}
