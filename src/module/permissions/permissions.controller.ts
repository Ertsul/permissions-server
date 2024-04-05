import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePermissionsDto } from './permissions.dto';
import { PermissionsService } from './permissions.service';
import { HttpMessage } from '../../shared/constant';

@ApiBearerAuth()
@ApiTags('permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get('list')
  async queryList() {
    const data = await this.permissionsService.queryList();
    return data;
  }

  @Get(':id')
  async queryPermissionsById(@Param('id') id: number) {
    const data = await this.permissionsService.queryDetailById(id);
    return data;
  }

  @Post()
  async create(@Body() data: CreatePermissionsDto): Promise<string> {
    await this.permissionsService.createPermissions(data);
    return HttpMessage.SUCCESS;
  }

  @Put(':id')
  async updateById(
    @Param('id') id: number,
    @Body() data: CreatePermissionsDto,
  ): Promise<string> {
    await this.permissionsService.updatePermissions(id, data);
    return HttpMessage.SUCCESS;
  }

  @Delete(':id')
  async deleteById(@Param('id') id: number): Promise<string> {
    await this.permissionsService.deleteById(id);
    return HttpMessage.SUCCESS;
  }
}
