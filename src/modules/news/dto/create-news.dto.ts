import { IsNotEmpty } from 'class-validator';

export class CreateNewsDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  thumbnail: string;

  @IsNotEmpty()
  categorie: string;
}
