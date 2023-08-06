import { Users } from './../users/users';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('messages')
export class Messages {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public msg: string;

  @ManyToOne(() => Users, (user) => user.message)
  @JoinColumn()
  public user: Users;
}
