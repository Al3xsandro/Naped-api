import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NewsModule } from '../../modules/news/news.module';
import { UserModule } from '../../modules/users/users.module';
import { AuthModule } from '../../modules/auth/auth.module';

import { User } from '../../modules/users/entities/user.entity';
import { News } from '../../modules/news/entities/news.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: 5432,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [User, News],
      synchronize: true,
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10
    }),
    UserModule,
    NewsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
