import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private nestConfigService: NestConfigService) {}

  get env(): string {
    return this.nestConfigService.get<string>('NODE_ENV');
  }

  get isProd(): boolean {
    console.log('>> this.env :', this.env);
    return this.nestConfigService.get<string>('NODE_ENV') === 'production';
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
}
