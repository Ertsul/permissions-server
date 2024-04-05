import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from './user.entity';
import { FindOperator, In, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { ROLE_TABLE, RoleEntity } from '../role/role.entity';
import * as bcrypt from 'bcrypt';
import { PERMISSIONS_TABLE } from '../permissions/permissions.entity';

type NameExistType = { username: string; id?: FindOperator<number> };

const getHashedPassword = async (password: string = '') =>
  await bcrypt.hash(password, 11);

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
    private readonly configService: ConfigService,
  ) {}

  async judgeNameIsExist(options: NameExistType) {
    const nameExist = await this.userRepository.findBy(options);
    if (nameExist && nameExist.length) {
      throw new HttpException('name 已存在', HttpStatus.BAD_REQUEST);
    }
  }

  async createUser(data: CreateUserDto) {
    await this.judgeNameIsExist({ username: data.username });
    const { role = '', ...insertData } = data || {};
    const userData: any = await this.userRepository.create(
      insertData as RoleEntity,
    );
    userData.password = await getHashedPassword(data.password);
    if (role) {
      const roleData = await this.roleRepository.findBy({
        id: In(role.split(',')),
      });
      userData.role = roleData;
    }
    await this.userRepository.save(userData);
  }

  async deleteById(id: number) {
    await this.queryDetailById(id);
    await this.userRepository.delete({ id });
  }

  async updateUser(id: number, data: UpdateUserDto) {
    await this.judgeNameIsExist({
      id: Not(id),
      username: data.username,
    });
    const { role = '', ...newData } = data || {};
    let targetData: any = await this.queryDetailById(id);
    targetData = {
      ...targetData,
      ...newData,
    };
    targetData.role = [];
    if (role) {
      const roleData = await this.roleRepository.findBy({
        id: In(role.split(',')),
      });
      targetData.role = roleData;
    }
    await this.userRepository.save(targetData);
  }

  async updatePassword({ id, oldPassword, newPassword }) {
    const data = await this.queryDetailById(id, true);
    const match = await bcrypt.compare(oldPassword, data.password);
    if (!match) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    }
    data.password = await getHashedPassword(newPassword);
    await this.userRepository.save(data);
  }

  async queryDetailById(
    id: number,
    password: boolean = false,
    permissions: boolean = false,
  ) {
    const select: any = ['id', 'username', 'status', 'role'];
    password && select.push('password');
    const relations = [ROLE_TABLE, `${ROLE_TABLE}.${PERMISSIONS_TABLE}`];
    const data = await this.userRepository.findOne({
      select,
      where: { id },
      relations,
    });
    if (!data) {
      throw new NotFoundException(`ID ${id} not found`);
    }
    return data;
  }

  async queryDetailByUsername(username: string = '') {
    const data = await this.userRepository.findOne({
      where: { username },
    });
    if (!data) {
      throw new NotFoundException(`Username ${username} not found`);
    }
    return data;
  }

  async queryList() {
    const data = await this.userRepository.find({
      select: ['id', 'username', 'status', 'role'],
      relations: [ROLE_TABLE],
    });
    return data;
  }
}
