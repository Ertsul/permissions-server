import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService as CustomConfigService } from './config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Dogs } from '../dogs/dogs.entity';

@Global() // 注册为全局模块
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [NestConfigModule],
      useFactory: async (configService: CustomConfigService) => {
        const workDir = process.cwd() + '/dist';
        return {
          type: configService.dataBaseType as any,
          host: configService.dataBaseHost,
          port: Number(configService.dataBasePort),
          username: configService.dataBaseUsername,
          password: configService.dataBasePassword,
          database: configService.dataBaseName,
          entities: [workDir + '/**/*.entity{.ts,.js}'],
          synchronize: !configService.isProd, // TODO
        };
      },
      inject: [CustomConfigService],
    }),
  ],
  providers: [CustomConfigService],
  exports: [CustomConfigService],
})
export class ConfigModule {
  /**
   * typeorm 连接 mysql 成功后执行的回调函数
   */
  async onModuleInit() {
    console.log('>> Database connection established :');
    // console.log('>> Database connection established :', this.connection);
  }
}
