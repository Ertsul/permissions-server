import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenEntity } from './token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenController } from './token.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TokenEntity])],
  providers: [TokenService],
  controllers: [TokenController],
  exports: [TokenService],
})
export class TokenModule {}
