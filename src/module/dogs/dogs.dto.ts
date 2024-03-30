import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DogDto {
  @ApiProperty({ description: 'ID', example: '1' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'name', example: 'ttii' })
  @IsString()
  name: string;
}
