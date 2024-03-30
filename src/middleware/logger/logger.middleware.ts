import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const beforeTime: number = Date.now();
    // console.log('>> Before Request :', beforeTime);
    next();
    const afterTime: number = Date.now();
    console.log('>> Logger Time :', afterTime - beforeTime + 'ms');
  }
}
