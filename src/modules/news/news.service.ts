import { 
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Like, Repository } from 'typeorm';

import { CreateNewsDTO } from './dto/create-news.dto';
import { News } from './entities/news.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
  ) {};

  async findAll() {
    const news = await this.newsRepository.find();

    if(!news[0])
      throw new HttpException({
          status: HttpStatus.NO_CONTENT,
          error: 'No content!',
        },
        HttpStatus.NO_CONTENT
      );

    return news;
  };

  async findById(id: string) {
    if(!id.trim())
      throw new BadRequestException();

    const news = await this.newsRepository.findOne({ where: { id } });

    if(!news)
      throw new HttpException({
          status: HttpStatus.NO_CONTENT,
          error: 'No content!',
        },
        HttpStatus.NO_CONTENT
      );

    await this.newsRepository.update(news.id, {
      views: 1
    });

    return news;
  };

  async search(title: string) {
    if(!title.trim())
      throw new BadRequestException();

    const news = await this.newsRepository.find({ title: Like(`%${title}%`) })

    if(!news[0])
      throw new HttpException({
          status: HttpStatus.NO_CONTENT,
          error: 'No content!',
        },
        HttpStatus.NO_CONTENT
      );

    return news;
  };

  async create(createNewsDTO: CreateNewsDTO) {
    const { 
      title,
      description,
      thumbnail,
      categorie
    } = createNewsDTO;

    const news = this.newsRepository.create({
      title,
      description,
      thumbnail,
      categorie
    });

    const createNews = await this.newsRepository.save(news);

    return {
      title: createNews.title,
      description: createNews.description,
      categorie: createNews.categorie,
      created_at: createNews.created_at
    };
  };
};
