import { Injectable, NestMiddleware } from '@nestjs/common';
import * as session from 'express-session';
import { ConfigService } from 'src/module/config/config.service';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: any, res: any, next: () => void) {
    session({
      secret: 'permissions-server', // 用于签名会话 ID 的密钥，可以是任意字符串
      resave: false,
      saveUninitialized: false,
      cookie: { secure: this.configService.isProd }, // 设置 cookie 的安全选项
    })(req, res, next);
  }
}
