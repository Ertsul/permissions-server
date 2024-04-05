import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private nestConfigService: NestConfigService) {}

  get env(): string {
    return this.nestConfigService.get<string>('NODE_ENV');
  }

  get isProd(): boolean {
    return this.env === 'production';
  }

  get dataBaseHost(): string {
    return this.nestConfigService.get<string>('DATABASE_HOST');
  }

  get dataBasePort(): number {
    return +this.nestConfigService.get<number>('DATABASE_PORT');
  }

  get dataBaseUsername(): string {
    return this.nestConfigService.get<string>('DATABASE_USERNAME');
  }

  get dataBasePassword(): string {
    return this.nestConfigService.get<string>('DATABASE_PASSWORD');
  }

  get dataBaseName(): string {
    return this.nestConfigService.get<string>('DATABASE_NAME');
  }

  get dataBaseType(): string {
    return this.nestConfigService.get<string>('DATABASE_TYPE');
  }

  get maxTokenCount(): number {
    return this.nestConfigService.get<number>('MAX_TOKEN_COUNT_SAMETIME')
  }

  get jwtSecretKey(): string {
    return this.nestConfigService.get<string>('JWT_SECRET_KEY');
  }

  get jwtExpiresIn(): string {
    return this.nestConfigService.get<string>('JWT_EXPIRES_IN');
  }

  get tokenNameInCookies(): string {
    return this.nestConfigService.get<string>('TOKEN_NAME_IN_COOKIES')
  }
}
