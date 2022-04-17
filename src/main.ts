import { NestFactory } from '@nestjs/core';
import { AppModule } from 'modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get('APP_PORT');

  app.useStaticAssets(path.join(__dirname, '..', 'public'));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(port);

  console.log(`App init on http://localhost:${port}`);
}
bootstrap();
