/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { CreateUserDTO } from './dto/create-user.dto';

import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async me(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new BadRequestException();
    }

    const { password, ...rest } = user;

    return rest;
  }

  async create(createUserDTO: CreateUserDTO) {
    const { email, username, password } = createUserDTO;

    if (!email || !username || !password) {
      throw new BadRequestException();
    }

    const userAlreadyExists = await this.usersRepository.findOne({
      email,
    });

    if (userAlreadyExists)
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'This user already exists!',
        },
        HttpStatus.BAD_REQUEST,
      );

    const hashPassword = await hash(password, 8);

    const user = this.usersRepository.create({
      email,
      username,
      password: hashPassword,
    });

    const createUser = await this.usersRepository.save(user);

    return {
      email: createUser.email,
      created_at: createUser.created_at,
    };
  }

  async getUser(username: string) {
    if (!username) throw new BadRequestException();

    const user = await this.usersRepository.findOne({
      where: { username },
    });

    if (!user)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Invalid username',
        },
        HttpStatus.NOT_FOUND,
      );

    const { id, isVerified, password, email, roles, ...rest } = user;

    return {
      rest,
    };
  }
}
