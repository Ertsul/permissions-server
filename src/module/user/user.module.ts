import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { RoleEntity } from '../role/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
