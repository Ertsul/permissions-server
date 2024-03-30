import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Dogs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  color: string;

  @Column({ default: true })
  isActive: boolean;
}
