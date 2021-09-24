import { 
    Body,
    Controller,
    Get,
    Post,
} from '@nestjs/common';
import { CreateNewsDTO } from './dto/create-news.dto';

@Controller('news')
export class NewsController {
    constructor() {}
    
    @Get()
    public async findAll() {};

    @Get('/:id')
    public async findById() {};

    @Get('/:title')
    public async search() {};

    @Post('/create')
    public async create(@Body() createNewsDTO: CreateNewsDTO) {};
};