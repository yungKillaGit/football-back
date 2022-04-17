import { NestFactory } from '@nestjs/core';
import { AppModule } from 'modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('APP_PORT');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(port);
  console.log(`App init on http://localhost:${port}`);
}
bootstrap();
