import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Todos api')
  .setDescription('Todos crud api')
  .setVersion('1.0')
  .addTag('Todos', "Todos crud api")
  .build();

 const documentFactory = () => SwaggerModule.createDocument(app, config);
 SwaggerModule.setup('', app, documentFactory);

 app.useGlobalPipes(new ValidationPipe());
 
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
