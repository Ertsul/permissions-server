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
import { CreateUserDto } from './user.dto';
import { RoleEntity } from '../role/role.entity';

type NameExistType = { username: string; id?: FindOperator<number> };

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private rolesRepository: Repository<RoleEntity>,
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
    const { roles = '', ...insertData } = data || {};
    const userData: any = await this.userRepository.create(
      insertData as RoleEntity,
    );
    if (roles) {
      const rolesData = await this.rolesRepository.findBy({
        id: In(roles.split(',')),
      });
      userData.roles = rolesData;
    }
    await this.userRepository.save(userData);
  }

  async deleteById(id: number) {
    await this.queryDetailById(id);
    await this.userRepository.delete({ id });
  }

  async updateUser(id: number, data: CreateUserDto) {
    await this.judgeNameIsExist({
      id: Not(id),
      username: data.username,
    });
    const { roles = '', ...newData } = data || {};
    let targetData: any = await this.queryDetailById(id);
    targetData = {
      ...targetData,
      ...newData,
    };
    targetData.roles = [];
    if (roles) {
      const rolesData = await this.rolesRepository.findBy({
        id: In(roles.split(',')),
      });
      targetData.roles = rolesData;
    }
    await this.userRepository.save(targetData);
  }

  async queryDetailById(id: number) {
    const data = await this.userRepository.findOne({ where: { id } });
    if (!data) {
      throw new NotFoundException(`ID ${id} not found`);
    }
    return data;
  }

  async queryList() {
    const data = await this.userRepository.find();
    return data;
  }
}
