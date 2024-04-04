import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './role.entity';
import { RoleController } from './role.controller';
import { PermissionsEntity } from '../permissions/permissions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, PermissionsEntity])],
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
