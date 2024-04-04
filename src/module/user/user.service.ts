import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';
import { CreateUserDto } from './user.dto';
import { filterObjectDataByKeys } from 'src/shared/utils';

const fields = ['username', 'password', 'status'];

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
  ) {}

  async createUser(data: CreateUserDto) {
    const insertData = filterObjectDataByKeys({ keys: fields, data });
    await this.userRepository.save(insertData);
  }

  async deleteById(id: number) {
    await this.queryDetailById(id);
    await this.userRepository.delete({ id });
  }

  async updateUser(id: number, data: CreateUserDto) {
    const oldData = await this.queryDetailById(id);
    const targetData = filterObjectDataByKeys({
      keys: fields,
      data: {
        ...oldData,
        ...data,
      },
    });
    await this.userRepository.update(id, targetData);
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
