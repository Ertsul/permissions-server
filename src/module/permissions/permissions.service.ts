import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '../config/config.service';
import { PermissionsEntity } from './permissions.entity';
import { filterObjectDataByKeys } from 'src/shared/utils';
import { CreatePermissionsDto } from './permissions.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(PermissionsEntity)
    private permissionsRepository: Repository<PermissionsEntity>,
    private readonly configService: ConfigService,
  ) {}

  async createPermissions(data: CreatePermissionsDto) {
    await this.permissionsRepository.save(data);
  }

  async deleteById(id: number) {
    await this.queryDetailById(id);
    await this.permissionsRepository.delete({ id });
  }

  async updatePermissions(id: number, data: CreatePermissionsDto) {
    const oldData = await this.queryDetailById(id);
    await this.permissionsRepository.update(id, { ...oldData, ...data });
  }

  async queryDetailById(id: number) {
    const data = await this.permissionsRepository.findOne({ where: { id } });
    if (!data) {
      throw new NotFoundException(`ID ${id} not found`);
    }
    return data;
  }

  async queryList() {
    const data = await this.permissionsRepository.find();
    return data;
  }
}
