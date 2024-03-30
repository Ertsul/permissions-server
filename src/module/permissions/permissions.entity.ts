import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('permissions')
export class PermissionsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ comment: '权限类型：CATALOG | MENU | BUTTON' })
  type: string;

  @Column()
  icon: string;

  @Column()
  component: string;

  @Column()
  routerName: string;

  @Column()
  routerPath: string;

  @Column()
  redirectUrl: string;

  @Column()
  permissionsKey: string;

  @Column()
  permissionsApi: string;

  @Column({ default: false })
  permissionsApiIsRegex: boolean;

  @Column()
  permissionsMethods: string;

  @Column()
  sort: number;

  @Column({ default: true })
  visible: boolean;

  @Column()
  parentId: boolean;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
