import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/me')
  public async find() {
    return;
  };

  @Post('/register')
  public async create(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.create(createUserDTO);
  };
};