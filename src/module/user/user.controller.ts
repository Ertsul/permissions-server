import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { HttpMessage } from 'src/shared/constant';
import { CreateUserDto } from './user.dto';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  async queryList() {
    const data = await this.userService.queryList();
    return data;
  }

  @Get(':id')
  async queryPermissionsById(@Param('id') id: number) {
    const data = await this.userService.queryDetailById(id);
    return data;
  }

  @Post()
  async create(@Body() data: CreateUserDto): Promise<string> {
    await this.userService.createUser(data);
    return HttpMessage.SUCCESS;
  }

  @Put(':id')
  async updateById(
    @Param('id') id: number,
    @Body() data: CreateUserDto,
  ): Promise<string> {
    await this.userService.updateUser(id, data);
    return HttpMessage.SUCCESS;
  }

  @Delete(':id')
  async deleteById(@Param('id') id: number): Promise<string> {
    await this.userService.deleteById(id);
    return HttpMessage.SUCCESS;
  }
}
