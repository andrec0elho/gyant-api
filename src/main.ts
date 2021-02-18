import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { ConfigService } from 'nestjs-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const reflector = app.get(Reflector);
  const config = app.get(ConfigService);
  const apiVersion: string = config.get('app.api_version').toString();

  // app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const swaggerInfo = config.get('app.swagger');
  const options = new DocumentBuilder()
    .setTitle(swaggerInfo.title)
    .setDescription(swaggerInfo.desc)
    .setVersion(apiVersion)
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(3000);
}
bootstrap();
