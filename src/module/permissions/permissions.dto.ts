import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsInt, IsString } from 'class-validator';

export class PermissionsDto {
  @ApiProperty({ description: 'ID', example: '1' })
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsString()
  icon: string;

  @IsString()
  component: string;

  @IsString()
  routerName: string;

  @IsString()
  routerPath: string;

  @IsString()
  redirectUrl: string;

  @IsString()
  permissionsKey: string;

  @IsString()
  permissionsApi: string;

  @IsBoolean()
  permissionsApiIsRegex: boolean;

  @IsString()
  permissionsMethods: string;

  @IsInt()
  sort: number;

  @IsBoolean()
  visible: boolean;

  @IsBoolean()
  parentId: boolean;

  @IsDate()
  createAt: Date;

  @IsDate()
  updatedAt: Date;
}

export class CreatePermissionsDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsString()
  icon: string;

  @IsString()
  component: string;

  @IsString()
  routerName: string;

  @IsString()
  routerPath: string;

  @IsString()
  redirectUrl: string;

  @IsString()
  permissionsKey: string;

  @IsString()
  permissionsApi: string;

  @IsBoolean()
  permissionsApiIsRegex: boolean;

  @IsString()
  permissionsMethods: string;

  @IsInt()
  sort: number;

  @IsBoolean()
  visible: boolean;

  @IsBoolean()
  parentId: boolean;
}
