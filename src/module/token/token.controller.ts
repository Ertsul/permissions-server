import * as bcrypt from 'bcrypt';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HttpMessage } from 'src/shared/constant';
import { TokenService } from './token.service';
import { CreateTokenDto, UpdateTokenDto } from './token.dto';

@ApiBearerAuth()
@ApiTags('token')
@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) { }

  @Get('/user-id/:user-id')
  async queryPermissionsById(@Param('user-id') userId: number) {
    const data = await this.tokenService.queryListByUserId(userId);
    return data;
  }

  @Get(':token')
  async queryPermissionsByToken(@Param('token') token: string) {
    const data = await this.tokenService.queryByToken(token);
    return data;
  }

  @Post()
  async create(@Body() data: CreateTokenDto): Promise<string> {
    await this.tokenService.insertToken(data);
    return HttpMessage.SUCCESS;
  }

  @Post('/update')
  async updateById(@Body() data: UpdateTokenDto): Promise<string> {
    await this.tokenService.updateToken(data);
    return HttpMessage.SUCCESS;
  }

  @Delete(':token')
  async deleteById(@Param('token') token: string): Promise<string> {
    await this.tokenService.deleteByToken(token);
    return HttpMessage.SUCCESS;
  }
}
