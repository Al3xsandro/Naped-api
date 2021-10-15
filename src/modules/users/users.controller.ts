import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
} from '@nestjs/common';

import { UserId } from 'src/shared/infra/http/decorators/userid.decorator';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  public async me(@UserId() user: string) {
    return this.userService.me(user);
  }

  @Post('/create')
  public async create(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.create(createUserDTO);
  }

  @Get('/:username')
  public async getUser(@Param('username') username: string){
    return this.userService.getUser(username);
  }
}
