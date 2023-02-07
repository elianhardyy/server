import { Users } from './users';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('follows')
export class Follows {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => Users, (user) => user.follower, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'follower_userId' })
  public follower: number;

  @ManyToOne(() => Users, (user) => user.followed, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'followed_userId' })
  public followed: number;
}
