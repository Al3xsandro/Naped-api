import { Body, Controller, Post } from '@nestjs/common';

import { AuthenticateUserDTO } from '../auth/dto/authenticate-user.dto';

import { AuthService } from './auth.service';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/auth')
  public async auth(@Body() authenticateUserDTO: AuthenticateUserDTO) {
    return this.authService.auth(authenticateUserDTO);
  }
}
