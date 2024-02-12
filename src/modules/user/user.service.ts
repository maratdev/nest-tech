import { Injectable } from '@nestjs/common';
import { users } from '../../moks';

// тут вся бизнес логика
@Injectable()
export class UserService {
  getUsers() {
    return users;
  }
}
