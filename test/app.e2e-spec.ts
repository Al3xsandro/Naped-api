import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/shared/infra/http/app.module';
import { INestApplication } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(404)
  });


  it('/news (GET)', async () => {
    return request(app.getHttpServer())
      .get('/news')
      .expect(200)
  })

  it('/users/:username (GET)', async () => {
    return request(app.getHttpServer())
      .get('/users/john')
      .expect(404)
  })

  afterAll(async () => {
    await app.close();
  })
});
