import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogsModule } from './module/dogs/dogs.module';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { ConfigModule } from './module/config/config.module';

@Module({
  imports: [ConfigModule, DogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
