import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from '../../module/token/token.service';
import * as dayjs from 'dayjs';

@Injectable()
export class VerifyTokenMiddleware implements NestMiddleware {
  constructor(private readonly tokenService: TokenService) {}

  async use(req: any, res: any, next: () => void) {
    let token = this.tokenService.getTokenFromCookie(req);
    if (!token) {
      throw new UnauthorizedException();
    }
    const { userId, exp }: any = await this.tokenService.analyzeToken(token); // 判断 token 是否过期
    // token 未过期，判断剩余时间是否不到 4 个小时，是的话则更新 token
    const expiresInTime = dayjs(exp * 1000).valueOf();
    const currentTime = dayjs(new Date()).valueOf();
    const restHours = dayjs(expiresInTime).diff(currentTime, 'hours'); // 剩余小时数
    if (restHours < 4) {
      const newToken = this.tokenService.genToken(userId);
      await this.tokenService.updateToken({ oldToken: token, newToken });
      this.tokenService.setTokenToCookie(res, token);
      token = newToken;
    }
    req.session.userInfo = {
      token,
      userId,
    };
    next();
  }
}
