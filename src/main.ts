import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { asapScheduler } from 'rxjs';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app
    .setGlobalPrefix('api')
    .useGlobalPipes( new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions:{
        enableImplicitConversion: true
      }
    }));

  await app.listen(process.env.PORT, () => {
    console.log(`Server on port ${process.env.PORT}`);
  });
}
bootstrap();
