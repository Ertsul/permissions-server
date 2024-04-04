import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsString } from 'class-validator';

export class RoleDto {
  @ApiProperty({ description: 'ID', example: 1 })
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsInt()
  status: number;

  @IsInt()
  isRoot: number;

  // TODO
  // @permissions()

  @IsDate()
  createAt: Date;

  @IsDate()
  updatedAt: Date;
}

export class CreateRoleDto {
  @IsString()
  name: string;

  @IsInt()
  status: number;

  @IsInt()
  isRoot: number;

  @IsString()
  permissions: string;
}
