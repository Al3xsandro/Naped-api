import { Test } from '@nestjs/testing';

import { News } from './entities/news.entity';

import { NewsController } from './news.controller';
import { NewsService } from './news.service';

const NewsEntityList: News[] = [
  new News({
    title: 'example',
    category: 'tvshows',
    description: 'example lorem ipsum',
    likes: 10,
    views: 10,
    thumbnail: 'http://image.com/img.png',
  }),
];

describe('NewsController', () => {
  let newsController: NewsController;
  let newsService: NewsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [NewsController],
      providers: [
        {
          provide: NewsService,
          useValue: {
            create: jest.fn().mockResolvedValue(NewsEntityList),
            findAll: jest.fn().mockResolvedValue(NewsEntityList),
            findById: jest.fn().mockResolvedValue(NewsEntityList),
            search: jest.fn().mockResolvedValue(NewsEntityList),
          },
        },
      ],
    }).compile();

    newsController = moduleRef.get<NewsController>(NewsController);
    newsService = moduleRef.get<NewsService>(NewsService);
  });

  it('should be defined', async () => {
    expect(newsController).toBeDefined();
    expect(newsService).toBeDefined();
  });

  describe('CreateNews', () => {
    it('should be able to create news', async () => {
      const result = await newsController.create(NewsEntityList[0]);

      expect(result).toEqual(NewsEntityList);
    });
  });

  describe('GetNews', () => {
    it('should be able to receive all news', async () => {
      const result = await newsController.findAll();

      expect(result).toEqual(NewsEntityList);
    });

    it('should be able to receive news data by id', async () => {
      const result = await newsController.findById(NewsEntityList[0].id);

      expect(result).toEqual(NewsEntityList);
    });

    it('should be able to search news', async () => {
      const result = await newsController.search(NewsEntityList[0].title);

      expect(result).toEqual(NewsEntityList);
    });
  });
});
