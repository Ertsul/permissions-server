import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsString } from 'class-validator';

export class PermissionsDto {
  @ApiProperty({ description: 'ID', example: '1' })
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsDate()
  createAt: Date;

  @IsDate()
  updatedAt: Date;
}
