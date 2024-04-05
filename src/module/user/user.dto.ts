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

  @IsString()
  role: string;

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

  @IsString()
  role: string;
}

export class UpdateUserDto {
  @IsString()
  username: string;

  @IsInt()
  status: number;

  @IsString()
  role: string;
}

export class ChangeUserPasswordDto {
  @IsString()
  oldPassword: string;

  @IsString()
  newPassword: string;
}
