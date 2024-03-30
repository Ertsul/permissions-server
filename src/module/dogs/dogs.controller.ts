import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { DogDto } from './dogs.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '../config/config.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Dogs } from './dogs.entity';
import { Repository } from 'typeorm';

@ApiBearerAuth() // 使用 BearerAuth 授权
@ApiTags('user') // 在 suagger ui 中给api分类
@Controller('dogs')
export class DogsController {
  constructor(
    @InjectRepository(Dogs)
    private dogsRepository: Repository<Dogs>,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getDogs(@Query(new ValidationPipe()) dogDto: DogDto) {
    console.log('>> id :', dogDto, process.env.DATABASE_NAME);
    console.log('>> id :', dogDto, this.configService.dataBaseHost);
    // const id: any = 1;
    console.log(
      '>> dogsRepository :',
      this.dogsRepository.findOneBy({ id: 1 }).then((res: any) => {
        console.log('>> res :', res);
      }),
    );
    return 'dogs';
  }

  @Get('list')
  getDogList() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
