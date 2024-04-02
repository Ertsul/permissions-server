import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('logger')
export class LoggerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ip: string;

  @Column()
  userId: number;

  @Column()
  userName: string;

  @Column()
  api: string;

  @Column()
  method: string;

  @Column({ type: 'json', nullable: true })
  params: Record<string, any>;

  @Column()
  duration: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
