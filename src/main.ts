import './config/crud-config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app/app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { MapResponseInterceptor } from 'common/interceptors/map-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get('APP_PORT');

  app.useStaticAssets(path.join(__dirname, '..', 'public'));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new MapResponseInterceptor());
  app.enableCors({
    origin: '*',
  });

  await app.listen(port);

  console.log(`App init on http://localhost:${port}`);
}
bootstrap();
