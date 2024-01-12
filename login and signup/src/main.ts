import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  // app.useGlobalPipes(new ValidationPipe());
  // app.useStaticAssets(join(__dirname,'..','Frontend'));
  await app.listen(3000);
}
bootstrap();
