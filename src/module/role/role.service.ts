import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './role.entity';
import { FindOperator, In, Not, Repository } from 'typeorm';
import { ConfigService } from '../config/config.service';
import { CreateRoleDto } from './role.dto';
import {
  PERMISSIONS_TABLE,
  PermissionsEntity,
} from '../permissions/permissions.entity';

type NameExistType = { name: string; id?: FindOperator<number> };

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
    @InjectRepository(PermissionsEntity)
    private permissionsRepository: Repository<PermissionsEntity>,
    private readonly configService: ConfigService,
  ) {}

  async judgeNameIsExist(options: NameExistType) {
    const nameExist = await this.roleRepository.findBy(options);
    if (nameExist && nameExist.length) {
      throw new HttpException('name 已存在', HttpStatus.BAD_REQUEST);
    }
  }

  async createRole(data: CreateRoleDto) {
    await this.judgeNameIsExist({ name: data.name });
    const { permissions = '', ...insertData } = data || {};
    const roleData: any = await this.roleRepository.create(
      insertData as RoleEntity,
    );
    if (permissions) {
      const permissionsData = await this.permissionsRepository.findBy({
        id: In(permissions.split(',')),
      });
      roleData.permissions = permissionsData;
    }
    await this.roleRepository.save(roleData);
  }

  async deleteById(id: number) {
    await this.queryDetailById(id);
    await this.roleRepository.delete({ id });
  }

  async updateRole(id: number, data: CreateRoleDto) {
    await this.judgeNameIsExist({
      id: Not(id),
      name: data.name,
    });
    const { permissions = '', ...newData } = data || {};
    let targetData: any = await this.queryDetailById(id);
    targetData = {
      ...targetData,
      ...newData,
    };
    targetData.permissions = [];
    if (permissions) {
      const permissionsData = await this.permissionsRepository.findBy({
        id: In(permissions.split(',')),
      });
      targetData.permissions = permissionsData;
    }
    await this.roleRepository.save(targetData);
  }

  async queryDetailById(id: number) {
    const data = await this.roleRepository.findOne({
      where: { id },
      relations: [PERMISSIONS_TABLE],
    });
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
