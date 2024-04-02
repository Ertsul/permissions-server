import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { CreateRoleDto } from './role.dto';
import { HttpMessage } from 'src/shared/constant';

@ApiBearerAuth()
@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('list')
  async queryList() {
    const data = await this.roleService.queryList();
    return data;
  }

  @Get(':id')
  async queryPermissionsById(@Param('id') id: number) {
    const data = await this.roleService.queryDetailById(id);
    return data;
  }

  @Post()
  async create(@Body() data: CreateRoleDto): Promise<string> {
    await this.roleService.createRole(data);
    return HttpMessage.SUCCESS;
  }

  @Put(':id')
  async updateById(
    @Param('id') id: number,
    @Body() data: CreateRoleDto,
  ): Promise<string> {
    await this.roleService.updateRole(id, data);
    return HttpMessage.SUCCESS;
  }

  @Delete(':id')
  async deleteById(@Param('id') id: number): Promise<string> {
    await this.roleService.deleteById(id);
    return HttpMessage.SUCCESS;
  }
}
