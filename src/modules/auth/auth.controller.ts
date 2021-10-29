import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthenticateUserDTO } from '../auth/dto/authenticate-user.dto';

import { AuthService } from './auth.service';

@ApiTags('Authentication')
@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/auth')
  public async auth(@Body() authenticateUserDTO: AuthenticateUserDTO) {
    return this.authService.auth(authenticateUserDTO);
  }
}
