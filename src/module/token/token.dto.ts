import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsString } from 'class-validator';

export class TokenDto {
  @ApiProperty({ description: 'ID', example: 1 })
  @IsInt()
  id: number;

  @IsString()
  token: string;

  @IsInt()
  userId: string;

  @IsDate()
  createAt: Date;

  @IsDate()
  updatedAt: Date;
}

export class CreateTokenDto {
  @IsString()
  token: string;

  @IsInt()
  userId: number;
}

export class UpdateTokenDto {
  @IsString()
  oldToken: string;

  @IsString()
  newToken: string;
}
