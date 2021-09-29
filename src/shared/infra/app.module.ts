import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NewsModule } from 'src/modules/news/news.module';
import { UserModule } from 'src/modules/users/users.module';

import { User } from 'src/modules/users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env'}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: 5432,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [User],
      synchronize: true
    }),
    UserModule,
    NewsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
