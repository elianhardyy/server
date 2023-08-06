import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './users';

@Entity('background')
export class Background {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: true })
  public background: string;

  @OneToOne(() => Users, (user) => user.bg, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'users_id' })
  public users: Users;
}
