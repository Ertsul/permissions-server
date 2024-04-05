import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { ConfigModule } from './module/config/config.module';
import { PermissionsModule } from './module/permissions/permissions.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './shared/interceptors/response.interceptor';
import { LoggerModule } from './module/logger/logger.module';
import { RoleModule } from './module/role/role.module';
import { UserModule } from './module/user/user.module';
import { SessionMiddleware } from './middleware/session/session.middleware';
import { VerificationCodeModule } from './module/verification-code/verification-code.module';
import { TokenModule } from './module/token/token.module';

@Module({
  imports: [
    ConfigModule,
    PermissionsModule,
    LoggerModule,
    RoleModule,
    UserModule,
    VerificationCodeModule,
    TokenModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer.apply(SessionMiddleware).forRoutes('*');
  }
}
