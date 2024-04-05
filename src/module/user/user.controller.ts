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
  Res,
  Session,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { HttpMessage } from 'src/shared/constant';
import {
  ChangeUserPasswordDto,
  CreateUserDto,
  LoginDto,
  UpdateUserDto,
} from './user.dto';
import { TokenService } from '../token/token.service';
import { CommonResponseType } from 'src/shared/interceptors/response.interceptor';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

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
    @Body() data: UpdateUserDto,
  ): Promise<string> {
    await this.userService.updateUser(id, data);
    return HttpMessage.SUCCESS;
  }

  @Delete(':id')
  async deleteById(@Param('id') id: number): Promise<string> {
    await this.userService.deleteById(id);
    return HttpMessage.SUCCESS;
  }

  @Post('/change-password/:id')
  async updatePassword(
    @Param('id') id: number,
    @Body() data: ChangeUserPasswordDto,
  ): Promise<string> {
    await this.userService.updatePassword({ id, ...data });
    return HttpMessage.SUCCESS;
  }

  @Post('login')
  async login(
    @Req() req: any,
    @Res() res: any,
    @Session() session: any,
    @Body() { username = '', password = '', verificationCode = '' }: LoginDto,
  ) {
    // console.log('>> Session :', session);
    const verificationCodeInSession = session?.verificationCode;
    // 验证码
    // TODO 浏览器验证
    if (String(verificationCode) !== String(verificationCodeInSession)) {
      throw new HttpException('验证码错误', HttpStatus.BAD_REQUEST);
    }
    const userInfo = await this.userService.queryDetailByUsername(username);
    const match = await bcrypt.compare(password, userInfo.password);
    const userId = userInfo.id;
    if (!match) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    }
    const token = await this.tokenService.genToken(userId);
    await this.tokenService.insertToken({ token, userId });
    this.tokenService.setTokenToCookie(res, token);
    return res.send({
      code: HttpStatus.OK,
      message: 'Success',
      data: HttpMessage.SUCCESS,
    } as CommonResponseType);
  }
}
