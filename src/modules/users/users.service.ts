import {
    Injectable,
    BadRequestException,
} from '@nestjs/common';

import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor() {}

  async find() {
    return;
  }

  async create(createUserDTO: CreateUserDTO) {
    const { email, username, password } = createUserDTO;

    if (!email.trim() || !username.trim() || !password) {
      throw new BadRequestException();
    }

    return;
  }
};