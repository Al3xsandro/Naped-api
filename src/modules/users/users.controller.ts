import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
} from '@nestjs/common';

import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { UserId } from '../../shared/infra/http/decorators/userid.decorator';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';

@ApiTags('user')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiBearerAuth()
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
