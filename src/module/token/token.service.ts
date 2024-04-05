import { Repository } from 'typeorm';
import * as JWT from 'jsonwebtoken';
import {
  ForbiddenException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenEntity } from './token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';
import { CreateTokenDto, UpdateTokenDto } from './token.dto';
import { USER_TABLE } from '../user/user.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private tokenRepository: Repository<TokenEntity>,
    private readonly configService: ConfigService,
  ) {}

  genToken(userId: number) {
    const secretKey = this.configService.jwtSecretKey;
    const expiresIn = this.configService.jwtExpiresIn;
    const token = JWT.sign(
      {
        userId,
      },
      secretKey,
      {
        expiresIn,
      },
    );
    return token;
  }

  getTokenFromCookie(response: any) {
    return response.cookies.get(this.configService.tokenNameInCookies) || '';
  }

  setTokenToCookie(response: any, token: string) {
    const timestamp = Date.now() + 604800000;
    response.cookie(this.configService.tokenNameInCookies, token, {
      httpOnly: false,
      expires: new Date(timestamp),
    })
  }

  deleteTokenInCookie(response: any) {
    this.setTokenToCookie(response, '');
  }

  analyzeToken(token: string) {
    return new Promise((resolve, reject) => {
      JWT.verify(
        token,
        this.configService.jwtSecretKey,
        (error: any, decode: any) => {
          if (error) {
            reject(error);
          }
          resolve(decode);
        },
      );
    }).catch((error) => {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('token已过期');
      }
      throw new ForbiddenException('token不合法');
    });
  }

  async insertToken(data: CreateTokenDto) {
    const tokenList = await this.queryListByUserId(data.userId);
    if (tokenList.length >= this.configService.maxTokenCount) {
      // 数据库保存的 token 数量超过了限制数，删除创建时间最久的 token
      let minCreateTimestamp = new Date(tokenList[0].createAt).valueOf();
      let minCreateTimestampToken = tokenList[0].token;
      if (tokenList.length > 1) {
        for (let i = 1; i < tokenList.length; i++) {
          const { createAt, token } = tokenList[i];
          const curTimestamp = new Date(createAt).valueOf();
          if (minCreateTimestamp > curTimestamp) {
            minCreateTimestamp = curTimestamp;
            minCreateTimestampToken = token;
          }
        }
      }
      await this.deleteByToken(minCreateTimestampToken);
    }
    await this.tokenRepository.save({
      token: data.token,
      user: data.userId,
    } as any);
  }

  async queryListByUserId(userId: number) {
    const data = await this.tokenRepository.find({
      where: {
        user: { id: userId },
      },
      relations: [USER_TABLE],
    });
    return data;
  }

  async queryByToken(token: string = '') {
    const data = await this.tokenRepository.findOne({
      where: {
        token,
      },
      relations: [USER_TABLE],
    });
    return data;
  }

  async updateToken({ oldToken, newToken }: UpdateTokenDto) {
    const data = await this.queryByToken(oldToken);
    if (!data) return;
    data.token = newToken;
    await this.tokenRepository.save(data);
  }

  async deleteByToken(token: string = '') {
    const data = await this.queryByToken(token);
    if (!data) return;
    await this.tokenRepository.delete({ token });
  }
}
