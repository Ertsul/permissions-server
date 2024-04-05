import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { PermissionsEntity } from '../permissions/permissions.entity';

export const ROLE_TABLE = 'role';

@Entity(ROLE_TABLE)
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ comment: '是否启用，默认1。1-使用，0-禁用', default: 1 })
  status: number;

  @Column({ comment: '是否是 root 用户，默认 0', default: 0 })
  isRoot: boolean;

  @ManyToMany(() => PermissionsEntity)
  @JoinTable({ name: 'role_permissions_rel' })
  permissions: PermissionsEntity[];

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
