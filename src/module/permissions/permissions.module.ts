import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsEntity } from './permissions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionsEntity])],
  providers: [PermissionsService],
  controllers: [PermissionsController],
})
export class PermissionsModule {}
