import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthenticateUserDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
