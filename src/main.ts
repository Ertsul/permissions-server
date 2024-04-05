import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(cookieParser());
  app.setGlobalPrefix('auth');
  /* 启动swagger */
  const options = new DocumentBuilder()
    .addBearerAuth() // 开启 BearerAuth 授权认证
    .setTitle('API 文档')
    .setDescription('API 文档')
    .setTermsOfService('https://docs.nestjs.cn/8/introduction')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  // 设置显示路由
  SwaggerModule.setup('/doc/swagger-api', app, document);

  await app.listen(3000);
}
bootstrap();
