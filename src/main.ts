import { NestFactory } from '@nestjs/core';
import { AppModule } from './shared/infra/http/app.module';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Naped API')
    .setDescription('Naped - Reading the best news every day')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
