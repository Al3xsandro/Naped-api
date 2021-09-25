import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NewsModule } from 'src/modules/news/news.module';
import { UserModule } from 'src/modules/users/users.module';

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
      entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
      migrations: ['dist/shared/infra/typeorm/migrations/*.{.ts,.js}'],
      cli: {
          migrationsDir: 'dist/shared/infra/typeorm/migrations'
      },
      synchronize: false
    }),
    UserModule,
    NewsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
