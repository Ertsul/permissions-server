import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '../config/config.service';
import { PermissionsEntity } from './permissions.entity';
import { filterObjectDataByKeys } from 'src/shared/utils';
import { CreatePermissionsDto } from './permissions.dto';

const fields = [
  'name',
  'type',
  'icon',
  'component',
  'routerName',
  'routerPath',
  'redirectUrl',
  'permissionsKey',
  'permissionsApi',
  'permissionsApiIsRegex',
  'permissionsMethods',
  'sort',
  'visible',
  'parentId',
];

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(PermissionsEntity)
    private permissionsRepository: Repository<PermissionsEntity>,
    private readonly configService: ConfigService,
  ) {}

  async createPermissions(data: CreatePermissionsDto) {
    const insertData = filterObjectDataByKeys({ keys: fields, data });
    await this.permissionsRepository.save(insertData);
  }

  async deleteById(id: number) {
    await this.queryDetailById(id);
    await this.permissionsRepository.delete({ id });
  }

  async updatePermissions(id: number, data: CreatePermissionsDto) {
    const oldData = await this.queryDetailById(id);
    const targetData = filterObjectDataByKeys({
      keys: fields,
      data: {
        ...oldData,
        ...data,
      },
    });
    await this.permissionsRepository.update(id, targetData);
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
