import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { MyLogger } from './logger.service';
// import { connectionSource } from 'ormconfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const port = +process.env.PORT || 4000;

  app.useLogger(app.get(MyLogger));

  app.setGlobalPrefix('api');
  console.log('Port running on: ', port);
  const config = new DocumentBuilder()
    .setTitle('REST API')
    .setDescription('The notes API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  // await connectionSource.initialize();
  // const myRepo = connectionSource.getRepository(SomeEntity)
}

bootstrap();
