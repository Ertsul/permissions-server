import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { RoleEntity } from '../role/role.entity';
import { TokenService } from '../token/token.service';
import { TokenEntity } from '../token/token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity, TokenEntity])],
  controllers: [UserController],
  providers: [UserService, TokenService],
})
export class UserModule {}
