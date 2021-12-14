import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { AuthenticateUserDTO } from '../auth/dto/authenticate-user.dto';

import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

import { compare } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

import { sign } from 'jsonwebtoken';
import auth from '../../config/auth';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async auth(authenticateUserDTO: AuthenticateUserDTO) {
    const { email, password } = authenticateUserDTO;

    if (!email || !password) {
      throw new BadRequestException();
    }

    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Incorrect email or password!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const verifyPassword = await compare(password, user.password);

    if (!verifyPassword) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Incorrect email or password!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const userId = user.id;

    const token = sign(
      {
        userId: user.id,
        roles: user.roles,
      },
      auth.secret,
      {
        subject: userId,
        expiresIn: auth.expiresIn,
      },
    );
    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        created_at: user.created_at,
        isVerified: user.isVerified,
      },
      token: token,
    };
  }
}
