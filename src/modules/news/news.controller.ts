import { 
  Body, 
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  Put,
  Delete
} from '@nestjs/common';

import { CreateNewsDTO } from './dto/create-news.dto';
import { NewsService } from './news.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../shared/infra/http/guards/roles.guard';

import { Roles } from '../../shared/infra/http/decorators/roles.decorator';
import { Role } from '../../shared/infra/http/enum/role.enum';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get()
  public async findAll() {
    return this.newsService.findAll();
  };
  
  @Get('/:id')
  public async findById(@Param('id') id: string) {
    return this.newsService.findById(id);
  };

  @Get('/search/:title')
  public async search(@Param('title') title: string) {
    return this.newsService.search(title);
  };

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  public async create(@Body() createNewsDTO: CreateNewsDTO) {
    return this.newsService.create(createNewsDTO);
  };

  @UseGuards(JwtAuthGuard)
  @Put('/like/:id')
  public async like(@Param('id') id: string){
    return this.newsService.like(id);
  };

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete('/delete/:id')
  public async delete(@Param('id') id: string){
    return this.newsService.delete(id);
  }
};
