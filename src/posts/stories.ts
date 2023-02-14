import { Users } from './../users/users';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('stories')
export class Stories {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: true })
  public stories: string;

  @ManyToOne(() => Users, (user) => user.story, { cascade: true })
  @JoinColumn({ name: 'users_id' })
  public user: Users;
}
