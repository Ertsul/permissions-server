import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({ description: 'ID', example: 1 })
  @IsInt()
  id: number;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsInt()
  status: number;

  @IsDate()
  createAt: Date;

  @IsDate()
  updatedAt: Date;
}

export class CreateUserDto {
  @IsString()
  username: string;

  @IsInt()
  status: number;

  @IsString()
  password: string;
}
