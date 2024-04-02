import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './role.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '../config/config.service';
import { CreateRoleDto } from './role.dto';
import { filterObjectDataByKeys } from 'src/shared/utils';

const fields = ['name', 'status', 'isRoot', 'permissions'];

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
    private readonly configService: ConfigService,
  ) {}

  async createRole(data: CreateRoleDto) {
    const insertData = filterObjectDataByKeys({ keys: fields, data });
    await this.roleRepository.save(insertData);
  }

  async deleteById(id: number) {
    await this.queryDetailById(id);
    await this.roleRepository.delete({ id });
  }

  async updateRole(id: number, data: CreateRoleDto) {
    const oldData = await this.queryDetailById(id);
    const targetData = filterObjectDataByKeys({
      keys: fields,
      data: {
        ...oldData,
        ...data,
      },
    });
    await this.roleRepository.update(id, targetData);
  }

  async queryDetailById(id: number) {
    const data = await this.roleRepository.findOne({ where: { id } });
    if (!data) {
      throw new NotFoundException(`ID ${id} not found`);
    }
    return data;
  }

  async queryList() {
    const data = await this.roleRepository.find();
    return data;
  }
}
